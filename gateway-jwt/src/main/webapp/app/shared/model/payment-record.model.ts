export interface IPaymentRecord {
  id?: number;
  txnType?: string;
  amount?: number;
  mentorId?: number;
  mentorName?: string;
  trainingId?: number;
  skillName?: string;
  totalAmountToMentor?: number;
  remarks?: string;
}

export const defaultValue: Readonly<IPaymentRecord> = {};
