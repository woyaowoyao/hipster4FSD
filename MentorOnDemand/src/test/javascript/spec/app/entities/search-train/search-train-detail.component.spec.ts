import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MentorOnDemandTestModule } from '../../../test.module';
import { SearchTrainDetailComponent } from 'app/entities/search-train/search-train-detail.component';
import { SearchTrain } from 'app/shared/model/search-train.model';

describe('Component Tests', () => {
  describe('SearchTrain Management Detail Component', () => {
    let comp: SearchTrainDetailComponent;
    let fixture: ComponentFixture<SearchTrainDetailComponent>;
    const route = ({ data: of({ searchTrain: new SearchTrain(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MentorOnDemandTestModule],
        declarations: [SearchTrainDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SearchTrainDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SearchTrainDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.searchTrain).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
