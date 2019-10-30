import { TrainStatus } from 'app/shared/model/enumerations/train-status.model';

export interface ITraining {
  id?: number;
  status?: TrainStatus;
  commissionAmount?: number;
  avgRating?: number;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  mentorId?: number;
  mentorName?: string;
  skillName?: string;
  fees?: number;
  remarks?: string;
}

export const defaultValue: Readonly<ITraining> = {};
