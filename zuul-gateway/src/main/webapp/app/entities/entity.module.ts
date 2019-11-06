import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'technology',
        loadChildren: () => import('./technology/technology/technology.module').then(m => m.TechnologyTechnologyModule)
      },
      {
        path: 'mentor',
        loadChildren: () => import('./trainings/mentor/mentor.module').then(m => m.TrainingsMentorModule)
      },
      {
        path: 'training',
        loadChildren: () => import('./trainings/training/training.module').then(m => m.TrainingsTrainingModule)
      },
      {
        path: 'mentor-skill',
        loadChildren: () => import('./trainings/mentor-skill/mentor-skill.module').then(m => m.TrainingsMentorSkillModule)
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
export class ZuulgatewayEntityModule {}
