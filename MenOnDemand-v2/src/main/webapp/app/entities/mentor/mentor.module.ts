import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MenOnDemandV2SharedModule } from 'app/shared/shared.module';
import { MentorComponent } from './mentor.component';
import { MentorDetailComponent } from './mentor-detail.component';
import { MentorUpdateComponent } from './mentor-update.component';
import { MentorDeletePopupComponent, MentorDeleteDialogComponent } from './mentor-delete-dialog.component';
import { mentorRoute, mentorPopupRoute } from './mentor.route';

const ENTITY_STATES = [...mentorRoute, ...mentorPopupRoute];

@NgModule({
  imports: [MenOnDemandV2SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [MentorComponent, MentorDetailComponent, MentorUpdateComponent, MentorDeleteDialogComponent, MentorDeletePopupComponent],
  entryComponents: [MentorDeleteDialogComponent]
})
export class MenOnDemandV2MentorModule {}
