import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MentorOnDemandSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [MentorOnDemandSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class MentorOnDemandHomeModule {}
