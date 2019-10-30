import { IMember } from 'app/shared/model/member.model';
import { PayTraType } from 'app/shared/model/enumerations/pay-tra-type.model';

export interface IPaymentRecord {
  id?: number;
  txnType?: PayTraType;
  amount?: number;
  mentorId?: number;
  mentorName?: string;
  trainingId?: number;
  skillName?: string;
  totalAmountToMentor?: number;
  remarks?: string;
  user?: IMember;
}

export const defaultValue: Readonly<IPaymentRecord> = {};
