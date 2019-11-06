import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IMentor } from 'app/shared/model/trainings/mentor.model';
import { AccountService } from 'app/core/auth/account.service';
import { MentorService } from './mentor.service';

@Component({
  selector: 'jhi-mentor',
  templateUrl: './mentor.component.html'
})
export class MentorComponent implements OnInit, OnDestroy {
  mentors: IMentor[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected mentorService: MentorService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.mentorService
      .query()
      .pipe(
        filter((res: HttpResponse<IMentor[]>) => res.ok),
        map((res: HttpResponse<IMentor[]>) => res.body)
      )
      .subscribe((res: IMentor[]) => {
        this.mentors = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMentors();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMentor) {
    return item.id;
  }

  registerChangeInMentors() {
    this.eventSubscriber = this.eventManager.subscribe('mentorListModification', response => this.loadAll());
  }
}
