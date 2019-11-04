import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'mentor',
        loadChildren: () => import('./trainings/mentor/mentor.module').then(m => m.TrainingsMentorModule)
      },
      {
        path: 'payment-record',
        loadChildren: () => import('./payments/payment-record/payment-record.module').then(m => m.PaymentsPaymentRecordModule)
      },
      {
        path: 'technology',
        loadChildren: () => import('./technology/technology/technology.module').then(m => m.TechnologyTechnologyModule)
      },
      {
        path: 'training',
        loadChildren: () => import('./trainings/training/training.module').then(m => m.TrainingsTrainingModule)
      },
      {
        path: 'my-calendar',
        loadChildren: () => import('./trainings/my-calendar/my-calendar.module').then(m => m.TrainingsMyCalendarModule)
      },
      {
        path: 'training-record',
        loadChildren: () => import('./trainings/training-record/training-record.module').then(m => m.TrainingsTrainingRecordModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class MentorOnDemandV2EntityModule {}
