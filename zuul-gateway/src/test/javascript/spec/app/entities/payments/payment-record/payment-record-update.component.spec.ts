import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ZuulgatewayTestModule } from '../../../../test.module';
import { PaymentRecordUpdateComponent } from 'app/entities/payments/payment-record/payment-record-update.component';
import { PaymentRecordService } from 'app/entities/payments/payment-record/payment-record.service';
import { PaymentRecord } from 'app/shared/model/payments/payment-record.model';

describe('Component Tests', () => {
  describe('PaymentRecord Management Update Component', () => {
    let comp: PaymentRecordUpdateComponent;
    let fixture: ComponentFixture<PaymentRecordUpdateComponent>;
    let service: PaymentRecordService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ZuulgatewayTestModule],
        declarations: [PaymentRecordUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PaymentRecordUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaymentRecordUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaymentRecordService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PaymentRecord(123);
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
        const entity = new PaymentRecord();
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
