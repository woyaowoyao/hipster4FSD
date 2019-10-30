import { IMember } from 'app/shared/model/member.model';
import { ITraining } from 'app/shared/model/training.model';
import { ISkill } from 'app/shared/model/skill.model';
import { TrainRecordStatus } from 'app/shared/model/enumerations/train-record-status.model';

export interface ITrainingRecord {
  id?: number;
  status?: TrainRecordStatus;
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
  trainingId?: number;
  skillName?: string;
  fees?: number;
  remarks?: string;
  user?: IMember;
  training?: ITraining;
  skill?: ISkill;
}

export const defaultValue: Readonly<ITrainingRecord> = {};
