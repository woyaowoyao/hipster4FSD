import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MentorOnDemandTestModule } from '../../../test.module';
import { SearchTrainUpdateComponent } from 'app/entities/search-train/search-train-update.component';
import { SearchTrainService } from 'app/entities/search-train/search-train.service';
import { SearchTrain } from 'app/shared/model/search-train.model';

describe('Component Tests', () => {
  describe('SearchTrain Management Update Component', () => {
    let comp: SearchTrainUpdateComponent;
    let fixture: ComponentFixture<SearchTrainUpdateComponent>;
    let service: SearchTrainService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MentorOnDemandTestModule],
        declarations: [SearchTrainUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SearchTrainUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SearchTrainUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SearchTrainService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SearchTrain(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new SearchTrain();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
