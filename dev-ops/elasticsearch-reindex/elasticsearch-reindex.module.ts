import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ZuulgatewaySharedModule } from '../../shared';

import {
    ElasticsearchReindexComponent,
    ElasticsearchReindexModalComponent,
    ElasticsearchReindexSelectedModalComponent,
    ElasticsearchReindexService,
    elasticsearchReindexRoute
} from './';

const ADMIN_ROUTES = [
    elasticsearchReindexRoute
];

@NgModule({
    imports: [
        ZuulgatewaySharedModule,
            RouterModule.forChild(ADMIN_ROUTES)
    ],
    declarations: [
        ElasticsearchReindexComponent,
        ElasticsearchReindexModalComponent,
        ElasticsearchReindexSelectedModalComponent
    ],
    entryComponents: [
        ElasticsearchReindexModalComponent,
        ElasticsearchReindexSelectedModalComponent
    ],
    providers: [
        ElasticsearchReindexService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ZuulgatewayElasticsearchReindexModule {}
