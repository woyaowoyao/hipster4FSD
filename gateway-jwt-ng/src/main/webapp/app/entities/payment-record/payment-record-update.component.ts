import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPaymentRecord, PaymentRecord } from 'app/shared/model/payment-record.model';
import { PaymentRecordService } from './payment-record.service';
import { IMember } from 'app/shared/model/member.model';
import { MemberService } from 'app/entities/member/member.service';

@Component({
  selector: 'jhi-payment-record-update',
  templateUrl: './payment-record-update.component.html'
})
export class PaymentRecordUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IMember[];

  editForm = this.fb.group({
    id: [],
    txnType: [null, [Validators.required]],
    amount: [null, [Validators.required]],
    totalAmountToMentor: [null, [Validators.required]],
    remarks: [],
    user: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected paymentRecordService: PaymentRecordService,
    protected memberService: MemberService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ paymentRecord }) => {
      this.updateForm(paymentRecord);
    });
    this.memberService
      .query({ filter: 'paymentrecord-is-null' })
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
  }

  updateForm(paymentRecord: IPaymentRecord) {
    this.editForm.patchValue({
      id: paymentRecord.id,
      txnType: paymentRecord.txnType,
      amount: paymentRecord.amount,
      totalAmountToMentor: paymentRecord.totalAmountToMentor,
      remarks: paymentRecord.remarks,
      user: paymentRecord.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const paymentRecord = this.createFromForm();
    if (paymentRecord.id !== undefined) {
      this.subscribeToSaveResponse(this.paymentRecordService.update(paymentRecord));
    } else {
      this.subscribeToSaveResponse(this.paymentRecordService.create(paymentRecord));
    }
  }

  private createFromForm(): IPaymentRecord {
    return {
      ...new PaymentRecord(),
      id: this.editForm.get(['id']).value,
      txnType: this.editForm.get(['txnType']).value,
      amount: this.editForm.get(['amount']).value,
      totalAmountToMentor: this.editForm.get(['totalAmountToMentor']).value,
      remarks: this.editForm.get(['remarks']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaymentRecord>>) {
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
}
