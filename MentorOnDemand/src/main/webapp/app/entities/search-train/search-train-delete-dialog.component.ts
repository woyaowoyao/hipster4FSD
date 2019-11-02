import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISearchTrain } from 'app/shared/model/search-train.model';
import { SearchTrainService } from './search-train.service';

@Component({
  selector: 'jhi-search-train-delete-dialog',
  templateUrl: './search-train-delete-dialog.component.html'
})
export class SearchTrainDeleteDialogComponent {
  searchTrain: ISearchTrain;

  constructor(
    protected searchTrainService: SearchTrainService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.searchTrainService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'searchTrainListModification',
        content: 'Deleted an searchTrain'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-search-train-delete-popup',
  template: ''
})
export class SearchTrainDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ searchTrain }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SearchTrainDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.searchTrain = searchTrain;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/search-train', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/search-train', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
