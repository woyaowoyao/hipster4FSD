import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MentorOnDemandV2SharedModule } from 'app/shared/shared.module';

import { AuditsComponent } from './audits.component';

import { auditsRoute } from './audits.route';

@NgModule({
  imports: [MentorOnDemandV2SharedModule, RouterModule.forChild([auditsRoute])],
  declarations: [AuditsComponent]
})
export class AuditsModule {}
