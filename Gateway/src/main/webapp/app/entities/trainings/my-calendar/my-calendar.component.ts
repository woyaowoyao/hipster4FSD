import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IMyCalendar } from 'app/shared/model/trainings/my-calendar.model';
import { AccountService } from 'app/core/auth/account.service';
import { MyCalendarService } from './my-calendar.service';

@Component({
  selector: 'jhi-my-calendar',
  templateUrl: './my-calendar.component.html'
})
export class MyCalendarComponent implements OnInit, OnDestroy {
  myCalendars: IMyCalendar[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected myCalendarService: MyCalendarService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.myCalendarService
      .query()
      .pipe(
        filter((res: HttpResponse<IMyCalendar[]>) => res.ok),
        map((res: HttpResponse<IMyCalendar[]>) => res.body)
      )
      .subscribe((res: IMyCalendar[]) => {
        this.myCalendars = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMyCalendars();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMyCalendar) {
    return item.id;
  }

  registerChangeInMyCalendars() {
    this.eventSubscriber = this.eventManager.subscribe('myCalendarListModification', response => this.loadAll());
  }
}
