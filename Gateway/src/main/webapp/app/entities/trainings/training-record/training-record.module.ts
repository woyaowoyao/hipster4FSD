import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MentorOnDemandV2SharedModule } from 'app/shared/shared.module';
import { TrainingRecordComponent } from './training-record.component';
import { TrainingRecordDetailComponent } from './training-record-detail.component';
import { TrainingRecordUpdateComponent } from './training-record-update.component';
import { TrainingRecordDeletePopupComponent, TrainingRecordDeleteDialogComponent } from './training-record-delete-dialog.component';
import { trainingRecordRoute, trainingRecordPopupRoute } from './training-record.route';

const ENTITY_STATES = [...trainingRecordRoute, ...trainingRecordPopupRoute];

@NgModule({
  imports: [MentorOnDemandV2SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TrainingRecordComponent,
    TrainingRecordDetailComponent,
    TrainingRecordUpdateComponent,
    TrainingRecordDeleteDialogComponent,
    TrainingRecordDeletePopupComponent
  ],
  entryComponents: [TrainingRecordDeleteDialogComponent]
})
export class TrainingsTrainingRecordModule {}
