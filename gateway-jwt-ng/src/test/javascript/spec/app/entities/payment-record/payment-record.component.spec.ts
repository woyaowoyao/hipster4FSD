import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FrontangularTestModule } from '../../../test.module';
import { PaymentRecordComponent } from 'app/entities/payment-record/payment-record.component';
import { PaymentRecordService } from 'app/entities/payment-record/payment-record.service';
import { PaymentRecord } from 'app/shared/model/payment-record.model';

describe('Component Tests', () => {
  describe('PaymentRecord Management Component', () => {
    let comp: PaymentRecordComponent;
    let fixture: ComponentFixture<PaymentRecordComponent>;
    let service: PaymentRecordService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FrontangularTestModule],
        declarations: [PaymentRecordComponent],
        providers: []
      })
        .overrideTemplate(PaymentRecordComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaymentRecordComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaymentRecordService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PaymentRecord(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.paymentRecords[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
