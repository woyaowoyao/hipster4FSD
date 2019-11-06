import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ZuulgatewayTestModule } from '../../../../test.module';
import { TechnologyComponent } from 'app/entities/technology/technology/technology.component';
import { TechnologyService } from 'app/entities/technology/technology/technology.service';
import { Technology } from 'app/shared/model/technology/technology.model';

describe('Component Tests', () => {
  describe('Technology Management Component', () => {
    let comp: TechnologyComponent;
    let fixture: ComponentFixture<TechnologyComponent>;
    let service: TechnologyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ZuulgatewayTestModule],
        declarations: [TechnologyComponent],
        providers: []
      })
        .overrideTemplate(TechnologyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TechnologyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TechnologyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Technology(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.technologies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
