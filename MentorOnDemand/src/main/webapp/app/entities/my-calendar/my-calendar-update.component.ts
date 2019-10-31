import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IMyCalendar, MyCalendar } from 'app/shared/model/my-calendar.model';
import { MyCalendarService } from './my-calendar.service';
import { ITraining } from 'app/shared/model/training.model';
import { TrainingService } from 'app/entities/training/training.service';
import { IMember } from 'app/shared/model/member.model';
import { MemberService } from 'app/entities/member/member.service';

@Component({
  selector: 'jhi-my-calendar-update',
  templateUrl: './my-calendar-update.component.html'
})
export class MyCalendarUpdateComponent implements OnInit {
  isSaving: boolean;

  trainings: ITraining[];

  members: IMember[];

  editForm = this.fb.group({
    id: [],
    calDate: [],
    duration: [],
    remarks: [],
    training: [],
    user: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected myCalendarService: MyCalendarService,
    protected trainingService: TrainingService,
    protected memberService: MemberService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ myCalendar }) => {
      this.updateForm(myCalendar);
    });
    this.trainingService
      .query({ filter: 'mycalendar-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ITraining[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITraining[]>) => response.body)
      )
      .subscribe(
        (res: ITraining[]) => {
          if (!this.editForm.get('training').value || !this.editForm.get('training').value.id) {
            this.trainings = res;
          } else {
            this.trainingService
              .find(this.editForm.get('training').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ITraining>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ITraining>) => subResponse.body)
              )
              .subscribe(
                (subRes: ITraining) => (this.trainings = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.memberService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMember[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMember[]>) => response.body)
      )
      .subscribe((res: IMember[]) => (this.members = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(myCalendar: IMyCalendar) {
    this.editForm.patchValue({
      id: myCalendar.id,
      calDate: myCalendar.calDate != null ? myCalendar.calDate.format(DATE_TIME_FORMAT) : null,
      duration: myCalendar.duration,
      remarks: myCalendar.remarks,
      training: myCalendar.training,
      user: myCalendar.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const myCalendar = this.createFromForm();
    if (myCalendar.id !== undefined) {
      this.subscribeToSaveResponse(this.myCalendarService.update(myCalendar));
    } else {
      this.subscribeToSaveResponse(this.myCalendarService.create(myCalendar));
    }
  }

  private createFromForm(): IMyCalendar {
    return {
      ...new MyCalendar(),
      id: this.editForm.get(['id']).value,
      calDate: this.editForm.get(['calDate']).value != null ? moment(this.editForm.get(['calDate']).value, DATE_TIME_FORMAT) : undefined,
      duration: this.editForm.get(['duration']).value,
      remarks: this.editForm.get(['remarks']).value,
      training: this.editForm.get(['training']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMyCalendar>>) {
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

  trackTrainingById(index: number, item: ITraining) {
    return item.id;
  }

  trackMemberById(index: number, item: IMember) {
    return item.id;
  }
}
