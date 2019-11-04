import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MentorOnDemandV2SharedModule } from 'app/shared/shared.module';

import { JhiConfigurationComponent } from './configuration.component';

import { configurationRoute } from './configuration.route';

@NgModule({
  imports: [MentorOnDemandV2SharedModule, RouterModule.forChild([configurationRoute])],
  declarations: [JhiConfigurationComponent]
})
export class ConfigurationModule {}
