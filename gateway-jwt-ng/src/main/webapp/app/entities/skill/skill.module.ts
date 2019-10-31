import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FrontangularSharedModule } from 'app/shared/shared.module';
import { SkillComponent } from './skill.component';
import { SkillDetailComponent } from './skill-detail.component';
import { SkillUpdateComponent } from './skill-update.component';
import { SkillDeletePopupComponent, SkillDeleteDialogComponent } from './skill-delete-dialog.component';
import { skillRoute, skillPopupRoute } from './skill.route';

const ENTITY_STATES = [...skillRoute, ...skillPopupRoute];

@NgModule({
  imports: [FrontangularSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [SkillComponent, SkillDetailComponent, SkillUpdateComponent, SkillDeleteDialogComponent, SkillDeletePopupComponent],
  entryComponents: [SkillDeleteDialogComponent]
})
export class FrontangularSkillModule {}
