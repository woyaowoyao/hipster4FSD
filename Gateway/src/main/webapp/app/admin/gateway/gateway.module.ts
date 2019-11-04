import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MentorOnDemandV2SharedModule } from 'app/shared/shared.module';

import { JhiGatewayComponent } from './gateway.component';

import { gatewayRoute } from './gateway.route';

@NgModule({
  imports: [MentorOnDemandV2SharedModule, RouterModule.forChild([gatewayRoute])],
  declarations: [JhiGatewayComponent]
})
export class GatewayModule {}
