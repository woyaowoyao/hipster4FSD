import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISearchTrain, SearchTrain } from 'app/shared/model/search-train.model';
import { SearchTrainService } from './search-train.service';

@Component({
  selector: 'jhi-search-train-update',
  templateUrl: './search-train-update.component.html'
})
export class SearchTrainUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    trainName: [],
    status: []
  });

  constructor(protected searchTrainService: SearchTrainService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ searchTrain }) => {
      this.updateForm(searchTrain);
    });
  }

  updateForm(searchTrain: ISearchTrain) {
    this.editForm.patchValue({
      id: searchTrain.id,
      trainName: searchTrain.trainName,
      status: searchTrain.status
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const searchTrain = this.createFromForm();
    if (searchTrain.id !== undefined) {
      this.subscribeToSaveResponse(this.searchTrainService.update(searchTrain));
    } else {
      this.subscribeToSaveResponse(this.searchTrainService.create(searchTrain));
    }
  }

  private createFromForm(): ISearchTrain {
    return {
      ...new SearchTrain(),
      id: this.editForm.get(['id']).value,
      trainName: this.editForm.get(['trainName']).value,
      status: this.editForm.get(['status']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISearchTrain>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
