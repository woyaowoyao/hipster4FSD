import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IPaymentRecord } from 'app/shared/model/payment-record.model';
import { AccountService } from 'app/core/auth/account.service';
import { PaymentRecordService } from './payment-record.service';

@Component({
  selector: 'jhi-payment-record',
  templateUrl: './payment-record.component.html'
})
export class PaymentRecordComponent implements OnInit, OnDestroy {
  paymentRecords: IPaymentRecord[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected paymentRecordService: PaymentRecordService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.paymentRecordService
      .query()
      .pipe(
        filter((res: HttpResponse<IPaymentRecord[]>) => res.ok),
        map((res: HttpResponse<IPaymentRecord[]>) => res.body)
      )
      .subscribe((res: IPaymentRecord[]) => {
        this.paymentRecords = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPaymentRecords();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPaymentRecord) {
    return item.id;
  }

  registerChangeInPaymentRecords() {
    this.eventSubscriber = this.eventManager.subscribe('paymentRecordListModification', response => this.loadAll());
  }
}
