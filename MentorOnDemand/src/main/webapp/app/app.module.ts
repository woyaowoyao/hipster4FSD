import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { MentorOnDemandSharedModule } from 'app/shared/shared.module';
import { MentorOnDemandCoreModule } from 'app/core/core.module';
import { MentorOnDemandAppRoutingModule } from './app-routing.module';
import { MentorOnDemandHomeModule } from './home/home.module';
import { MentorOnDemandEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    MentorOnDemandSharedModule,
    MentorOnDemandCoreModule,
    MentorOnDemandHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    MentorOnDemandEntityModule,
    MentorOnDemandAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class MentorOnDemandAppModule {}
