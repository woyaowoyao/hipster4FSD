import { IMentor } from 'app/shared/model/trainings/mentor.model';
import { ITechnology } from 'app/shared/model/trainings/technology.model';

export interface IMentorSkill {
  id?: number;
  selfRate?: string;
  experience?: number;
  mentor?: IMentor;
  technology?: ITechnology;
}

export class MentorSkill implements IMentorSkill {
  constructor(
    public id?: number,
    public selfRate?: string,
    public experience?: number,
    public mentor?: IMentor,
    public technology?: ITechnology
  ) {}
}
