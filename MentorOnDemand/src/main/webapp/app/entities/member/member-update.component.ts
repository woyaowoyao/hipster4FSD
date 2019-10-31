import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMember, Member } from 'app/shared/model/member.model';
import { MemberService } from './member.service';
import { IMentor } from 'app/shared/model/mentor.model';
import { MentorService } from 'app/entities/mentor/mentor.service';

@Component({
  selector: 'jhi-member-update',
  templateUrl: './member-update.component.html'
})
export class MemberUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IMember[];

  mentors: IMentor[];

  editForm = this.fb.group({
    id: [],
    type: [null, [Validators.required]],
    userName: [],
    name: [null, [Validators.required]],
    user: [],
    mentor: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected memberService: MemberService,
    protected mentorService: MentorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ member }) => {
      this.updateForm(member);
    });
    this.memberService
      .query({ filter: 'member-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IMember[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMember[]>) => response.body)
      )
      .subscribe(
        (res: IMember[]) => {
          if (!this.editForm.get('user').value || !this.editForm.get('user').value.id) {
            this.users = res;
          } else {
            this.memberService
              .find(this.editForm.get('user').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IMember>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IMember>) => subResponse.body)
              )
              .subscribe(
                (subRes: IMember) => (this.users = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.mentorService
      .query({ filter: 'member-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IMentor[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMentor[]>) => response.body)
      )
      .subscribe(
        (res: IMentor[]) => {
          if (!this.editForm.get('mentor').value || !this.editForm.get('mentor').value.id) {
            this.mentors = res;
          } else {
            this.mentorService
              .find(this.editForm.get('mentor').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IMentor>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IMentor>) => subResponse.body)
              )
              .subscribe(
                (subRes: IMentor) => (this.mentors = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(member: IMember) {
    this.editForm.patchValue({
      id: member.id,
      type: member.type,
      userName: member.userName,
      name: member.name,
      user: member.user,
      mentor: member.mentor
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const member = this.createFromForm();
    if (member.id !== undefined) {
      this.subscribeToSaveResponse(this.memberService.update(member));
    } else {
      this.subscribeToSaveResponse(this.memberService.create(member));
    }
  }

  private createFromForm(): IMember {
    return {
      ...new Member(),
      id: this.editForm.get(['id']).value,
      type: this.editForm.get(['type']).value,
      userName: this.editForm.get(['userName']).value,
      name: this.editForm.get(['name']).value,
      user: this.editForm.get(['user']).value,
      mentor: this.editForm.get(['mentor']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMember>>) {
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

  trackMemberById(index: number, item: IMember) {
    return item.id;
  }

  trackMentorById(index: number, item: IMentor) {
    return item.id;
  }
}
