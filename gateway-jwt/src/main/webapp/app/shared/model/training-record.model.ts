export interface ITrainingRecord {
  id?: number;
  status?: string;
  progress?: number;
  commissionAmount?: number;
  avgRating?: number;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  amountReceived?: number;
  userId?: number;
  userName?: string;
  mentorId?: number;
  mentorName?: string;
  trainingId?: number;
  skillName?: string;
  fees?: number;
  remarks?: string;
}

export const defaultValue: Readonly<ITrainingRecord> = {};
