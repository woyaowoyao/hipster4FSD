import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FrontangularTestModule } from '../../../test.module';
import { TrainingComponent } from 'app/entities/training/training.component';
import { TrainingService } from 'app/entities/training/training.service';
import { Training } from 'app/shared/model/training.model';

describe('Component Tests', () => {
  describe('Training Management Component', () => {
    let comp: TrainingComponent;
    let fixture: ComponentFixture<TrainingComponent>;
    let service: TrainingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FrontangularTestModule],
        declarations: [TrainingComponent],
        providers: []
      })
        .overrideTemplate(TrainingComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TrainingComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TrainingService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Training(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.trainings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
