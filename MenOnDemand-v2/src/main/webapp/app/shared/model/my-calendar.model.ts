import { Moment } from 'moment';
import { ITraining } from 'app/shared/model/training.model';
import { IUser } from 'app/core/user/user.model';
import { DurationType } from 'app/shared/model/enumerations/duration-type.model';

export interface IMyCalendar {
  id?: number;
  calDate?: Moment;
  duration?: DurationType;
  remarks?: string;
  training?: ITraining;
  user?: IUser;
}

export class MyCalendar implements IMyCalendar {
  constructor(
    public id?: number,
    public calDate?: Moment,
    public duration?: DurationType,
    public remarks?: string,
    public training?: ITraining,
    public user?: IUser
  ) {}
}
