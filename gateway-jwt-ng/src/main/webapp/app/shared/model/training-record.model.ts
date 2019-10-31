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
  amountReceived?: number;
  userName?: string;
  fees?: number;
  remarks?: string;
  user?: IMember;
  training?: ITraining;
  skill?: ISkill;
}

export class TrainingRecord implements ITrainingRecord {
  constructor(
    public id?: number,
    public status?: TrainRecordStatus,
    public progress?: number,
    public commissionAmount?: number,
    public avgRating?: number,
    public amountReceived?: number,
    public userName?: string,
    public fees?: number,
    public remarks?: string,
    public user?: IMember,
    public training?: ITraining,
    public skill?: ISkill
  ) {}
}
