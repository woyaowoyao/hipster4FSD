import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMentorSkill, MentorSkill } from 'app/shared/model/mentor-skill.model';
import { MentorSkillService } from './mentor-skill.service';
import { ITechnology } from 'app/shared/model/technology.model';
import { TechnologyService } from 'app/entities/technology/technology.service';
import { IMentor } from 'app/shared/model/mentor.model';
import { MentorService } from 'app/entities/mentor/mentor.service';

@Component({
  selector: 'jhi-mentor-skill-update',
  templateUrl: './mentor-skill-update.component.html'
})
export class MentorSkillUpdateComponent implements OnInit {
  isSaving: boolean;

  technologies: ITechnology[];

  mentors: IMentor[];

  editForm = this.fb.group({
    id: [],
    selfRate: [],
    experience: [],
    technology: [],
    mentor: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected mentorSkillService: MentorSkillService,
    protected technologyService: TechnologyService,
    protected mentorService: MentorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mentorSkill }) => {
      this.updateForm(mentorSkill);
    });
    this.technologyService
      .query({ filter: 'mentorskill-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ITechnology[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITechnology[]>) => response.body)
      )
      .subscribe(
        (res: ITechnology[]) => {
          if (!this.editForm.get('technology').value || !this.editForm.get('technology').value.id) {
            this.technologies = res;
          } else {
            this.technologyService
              .find(this.editForm.get('technology').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ITechnology>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ITechnology>) => subResponse.body)
              )
              .subscribe(
                (subRes: ITechnology) => (this.technologies = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.mentorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMentor[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMentor[]>) => response.body)
      )
      .subscribe((res: IMentor[]) => (this.mentors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(mentorSkill: IMentorSkill) {
    this.editForm.patchValue({
      id: mentorSkill.id,
      selfRate: mentorSkill.selfRate,
      experience: mentorSkill.experience,
      technology: mentorSkill.technology,
      mentor: mentorSkill.mentor
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const mentorSkill = this.createFromForm();
    if (mentorSkill.id !== undefined) {
      this.subscribeToSaveResponse(this.mentorSkillService.update(mentorSkill));
    } else {
      this.subscribeToSaveResponse(this.mentorSkillService.create(mentorSkill));
    }
  }

  private createFromForm(): IMentorSkill {
    return {
      ...new MentorSkill(),
      id: this.editForm.get(['id']).value,
      selfRate: this.editForm.get(['selfRate']).value,
      experience: this.editForm.get(['experience']).value,
      technology: this.editForm.get(['technology']).value,
      mentor: this.editForm.get(['mentor']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMentorSkill>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackTechnologyById(index: number, item: ITechnology) {
    return item.id;
  }

  trackMentorById(index: number, item: IMentor) {
    return item.id;
  }
}
