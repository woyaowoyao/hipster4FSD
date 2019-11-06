import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IMentorSkill } from 'app/shared/model/trainings/mentor-skill.model';
import { AccountService } from 'app/core/auth/account.service';
import { MentorSkillService } from './mentor-skill.service';

@Component({
  selector: 'jhi-mentor-skill',
  templateUrl: './mentor-skill.component.html'
})
export class MentorSkillComponent implements OnInit, OnDestroy {
  mentorSkills: IMentorSkill[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected mentorSkillService: MentorSkillService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.mentorSkillService
      .query()
      .pipe(
        filter((res: HttpResponse<IMentorSkill[]>) => res.ok),
        map((res: HttpResponse<IMentorSkill[]>) => res.body)
      )
      .subscribe((res: IMentorSkill[]) => {
        this.mentorSkills = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMentorSkills();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMentorSkill) {
    return item.id;
  }

  registerChangeInMentorSkills() {
    this.eventSubscriber = this.eventManager.subscribe('mentorSkillListModification', response => this.loadAll());
  }
}
