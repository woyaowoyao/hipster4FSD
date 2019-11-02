import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'mentor',
        loadChildren: () => import('./mentor/mentor.module').then(m => m.MenOnDemandV2MentorModule)
      },
      {
        path: 'mentor-skill',
        loadChildren: () => import('./mentor-skill/mentor-skill.module').then(m => m.MenOnDemandV2MentorSkillModule)
      },
      {
        path: 'my-calendar',
        loadChildren: () => import('./my-calendar/my-calendar.module').then(m => m.MenOnDemandV2MyCalendarModule)
      },
      {
        path: 'training',
        loadChildren: () => import('./training/training.module').then(m => m.MenOnDemandV2TrainingModule)
      },
      {
        path: 'training-record',
        loadChildren: () => import('./training-record/training-record.module').then(m => m.MenOnDemandV2TrainingRecordModule)
      },
      {
        path: 'payment-record',
        loadChildren: () => import('./payment-record/payment-record.module').then(m => m.MenOnDemandV2PaymentRecordModule)
      },
      {
        path: 'technology',
        loadChildren: () => import('./technology/technology.module').then(m => m.MenOnDemandV2TechnologyModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class MenOnDemandV2EntityModule {}
