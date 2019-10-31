import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MentorOnDemandSharedModule } from 'app/shared/shared.module';

import { LogsComponent } from './logs.component';

import { logsRoute } from './logs.route';

@NgModule({
  imports: [MentorOnDemandSharedModule, RouterModule.forChild([logsRoute])],
  declarations: [LogsComponent]
})
export class LogsModule {}
