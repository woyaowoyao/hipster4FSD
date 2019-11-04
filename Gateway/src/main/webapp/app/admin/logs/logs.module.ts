import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MentorOnDemandV2SharedModule } from 'app/shared/shared.module';

import { LogsComponent } from './logs.component';

import { logsRoute } from './logs.route';

@NgModule({
  imports: [MentorOnDemandV2SharedModule, RouterModule.forChild([logsRoute])],
  declarations: [LogsComponent]
})
export class LogsModule {}
