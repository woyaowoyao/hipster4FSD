import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITechnology, Technology } from 'app/shared/model/technology/technology.model';
import { TechnologyService } from './technology.service';

@Component({
  selector: 'jhi-technology-update',
  templateUrl: './technology-update.component.html'
})
export class TechnologyUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    toc: [],
    preprequisites: []
  });

  constructor(protected technologyService: TechnologyService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ technology }) => {
      this.updateForm(technology);
    });
  }

  updateForm(technology: ITechnology) {
    this.editForm.patchValue({
      id: technology.id,
      name: technology.name,
      toc: technology.toc,
      preprequisites: technology.preprequisites
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const technology = this.createFromForm();
    if (technology.id !== undefined) {
      this.subscribeToSaveResponse(this.technologyService.update(technology));
    } else {
      this.subscribeToSaveResponse(this.technologyService.create(technology));
    }
  }

  private createFromForm(): ITechnology {
    return {
      ...new Technology(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      toc: this.editForm.get(['toc']).value,
      preprequisites: this.editForm.get(['preprequisites']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITechnology>>) {
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
