import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ElasticsearchReindexModalComponent } from './elasticsearch-reindex-modal.component';
import { ElasticsearchReindexSelectedModalComponent } from './elasticsearch-reindex-selected-modal.component';

@Component({
    selector: 'jhi-elasticsearch-reindex',
    templateUrl: './elasticsearch-reindex.component.html'
})
export class ElasticsearchReindexComponent {

    entities: string[];
    reindexType: string;
    checks: { [key: string]: boolean } = {};

    constructor(
        private modalService: NgbModal
    ) {
        this.reindexType = 'all';
        this.entities = [
                'User'
        ];
    }

    doReindex() {
        if (this.reindexType === 'all') {
            this.showConfirm();
        } else {
            this.showConfirmSelected();
        }
    }

    showConfirm() {
        this.modalService.open(ElasticsearchReindexModalComponent);
    }

    showConfirmSelected() {
        const activeModal = this.modalService.open(ElasticsearchReindexSelectedModalComponent);
        const checks = this.checks;
        const reindexList = this.entities.filter(function(name) {
            return checks[name];
        });
        activeModal.componentInstance.entities = reindexList;
    }

}
