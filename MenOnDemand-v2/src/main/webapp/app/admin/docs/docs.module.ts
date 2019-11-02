import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenOnDemandV2SharedModule } from 'app/shared/shared.module';

import { JhiDocsComponent } from './docs.component';

import { docsRoute } from './docs.route';

@NgModule({
  imports: [MenOnDemandV2SharedModule, RouterModule.forChild([docsRoute])],
  declarations: [JhiDocsComponent]
})
export class DocsModule {}
