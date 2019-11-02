import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MentorOnDemandSharedModule } from 'app/shared/shared.module';
import { TrainingComponent } from './training.component';
import { TrainingDetailComponent } from './training-detail.component';
import { TrainingUpdateComponent } from './training-update.component';
import { trainingRoute, trainingPopupRoute } from './training.route';

const ENTITY_STATES = [...trainingRoute, ...trainingPopupRoute];

@NgModule({
  imports: [MentorOnDemandSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TrainingComponent,
    TrainingDetailComponent,
    TrainingUpdateComponent,
  ]
})
export class MentorOnDemandTrainingModule {}
