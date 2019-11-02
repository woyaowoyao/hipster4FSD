import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MentorOnDemandSharedModule } from 'app/shared/shared.module';
import { SearchTrainComponent } from './search-train.component';
import { SearchTrainDetailComponent } from './search-train-detail.component';
import { SearchTrainUpdateComponent } from './search-train-update.component';
import { SearchTrainDeletePopupComponent, SearchTrainDeleteDialogComponent } from './search-train-delete-dialog.component';
import { searchTrainRoute, searchTrainPopupRoute } from './search-train.route';

const ENTITY_STATES = [...searchTrainRoute, ...searchTrainPopupRoute];

@NgModule({
  imports: [MentorOnDemandSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SearchTrainComponent,
    SearchTrainDetailComponent,
    SearchTrainUpdateComponent,
    SearchTrainDeleteDialogComponent,
    SearchTrainDeletePopupComponent
  ],
  entryComponents: [SearchTrainDeleteDialogComponent]
})
export class MentorOnDemandSearchTrainModule {}
