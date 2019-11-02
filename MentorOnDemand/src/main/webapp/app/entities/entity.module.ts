import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'mentor',
        loadChildren: () => import('./mentor/mentor.module').then(m => m.MentorOnDemandMentorModule)
      },
      {
        path: 'mentor-skill',
        loadChildren: () => import('./mentor-skill/mentor-skill.module').then(m => m.MentorOnDemandMentorSkillModule)
      },
      {
        path: 'my-calendar',
        loadChildren: () => import('./my-calendar/my-calendar.module').then(m => m.MentorOnDemandMyCalendarModule)
      },
      {
        path: 'search-training',
        loadChildren: () => import('./search-train/search-train.module').then(m => m.MentorOnDemandTrainingModule)
      },
      {
        path: 'training',
        loadChildren: () => import('./training/training.module').then(m => m.MentorOnDemandTrainingModule)
      },
      {
        path: 'training-record',
        loadChildren: () => import('./training-record/training-record.module').then(m => m.MentorOnDemandTrainingRecordModule)
      },
      {
        path: 'payment-record',
        loadChildren: () => import('./payment-record/payment-record.module').then(m => m.MentorOnDemandPaymentRecordModule)
      },
      {
        path: 'member',
        loadChildren: () => import('./member/member.module').then(m => m.MentorOnDemandMemberModule)
      },
      {
        path: 'technology',
        loadChildren: () => import('./technology/technology.module').then(m => m.MentorOnDemandTechnologyModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class MentorOnDemandEntityModule {}
