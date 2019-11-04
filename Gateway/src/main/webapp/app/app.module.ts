import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { MentorOnDemandV2SharedModule } from 'app/shared/shared.module';
import { MentorOnDemandV2CoreModule } from 'app/core/core.module';
import { MentorOnDemandV2AppRoutingModule } from './app-routing.module';
import { MentorOnDemandV2HomeModule } from './home/home.module';
import { MentorOnDemandV2EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    MentorOnDemandV2SharedModule,
    MentorOnDemandV2CoreModule,
    MentorOnDemandV2HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    MentorOnDemandV2EntityModule,
    MentorOnDemandV2AppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class MentorOnDemandV2AppModule {}
