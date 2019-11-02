import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISearchTrain } from 'app/shared/model/search-train.model';

@Component({
  selector: 'jhi-search-train-detail',
  templateUrl: './search-train-detail.component.html'
})
export class SearchTrainDetailComponent implements OnInit {
  searchTrain: ISearchTrain;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ searchTrain }) => {
      this.searchTrain = searchTrain;
    });
  }

  previousState() {
    window.history.back();
  }
}
