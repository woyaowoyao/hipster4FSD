import { IMember } from 'app/shared/model/member.model';
import { PayTraType } from 'app/shared/model/enumerations/pay-tra-type.model';

export interface IPaymentRecord {
  id?: number;
  txnType?: PayTraType;
  amount?: number;
  totalAmountToMentor?: number;
  remarks?: string;
  user?: IMember;
}

export class PaymentRecord implements IPaymentRecord {
  constructor(
    public id?: number,
    public txnType?: PayTraType,
    public amount?: number,
    public totalAmountToMentor?: number,
    public remarks?: string,
    public user?: IMember
  ) {}
}
