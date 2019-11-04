import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MentorOnDemandV2SharedModule } from 'app/shared/shared.module';
import { PaymentRecordComponent } from './payment-record.component';
import { PaymentRecordDetailComponent } from './payment-record-detail.component';
import { PaymentRecordUpdateComponent } from './payment-record-update.component';
import { PaymentRecordDeletePopupComponent, PaymentRecordDeleteDialogComponent } from './payment-record-delete-dialog.component';
import { paymentRecordRoute, paymentRecordPopupRoute } from './payment-record.route';

const ENTITY_STATES = [...paymentRecordRoute, ...paymentRecordPopupRoute];

@NgModule({
  imports: [MentorOnDemandV2SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PaymentRecordComponent,
    PaymentRecordDetailComponent,
    PaymentRecordUpdateComponent,
    PaymentRecordDeleteDialogComponent,
    PaymentRecordDeletePopupComponent
  ],
  entryComponents: [PaymentRecordDeleteDialogComponent]
})
export class PaymentsPaymentRecordModule {}
