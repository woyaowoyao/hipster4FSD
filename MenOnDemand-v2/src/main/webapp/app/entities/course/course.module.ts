import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MenOnDemandV2SharedModule } from 'app/shared/shared.module';
import { CourseComponent } from './course.component';
import { CourseDetailComponent } from './course-detail.component';
import { CourseUpdateComponent } from './course-update.component';
import { CourseDeletePopupComponent, CourseDeleteDialogComponent } from './course-delete-dialog.component';
import { courseRoute, coursePopupRoute } from './course.route';

const ENTITY_STATES = [...courseRoute, ...coursePopupRoute];

@NgModule({
  imports: [MenOnDemandV2SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [CourseComponent, CourseDetailComponent, CourseUpdateComponent, CourseDeleteDialogComponent, CourseDeletePopupComponent],
  entryComponents: [CourseDeleteDialogComponent]
})
export class MenOnDemandV2CourseModule {}
