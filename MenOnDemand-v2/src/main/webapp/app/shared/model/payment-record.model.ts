import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { PayTraType } from 'app/shared/model/enumerations/pay-tra-type.model';

export interface IPaymentRecord {
  id?: number;
  txnType?: PayTraType;
  amount?: number;
  totalAmountToMentor?: number;
  issuedTime?: Moment;
  remarks?: string;
  user?: IUser;
}

export class PaymentRecord implements IPaymentRecord {
  constructor(
    public id?: number,
    public txnType?: PayTraType,
    public amount?: number,
    public totalAmountToMentor?: number,
    public issuedTime?: Moment,
    public remarks?: string,
    public user?: IUser
  ) {}
}
