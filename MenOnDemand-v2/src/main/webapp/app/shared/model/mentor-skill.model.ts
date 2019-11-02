import { ITechnology } from 'app/shared/model/technology.model';
import { IMentor } from 'app/shared/model/mentor.model';

export interface IMentorSkill {
  id?: number;
  selfRate?: string;
  experience?: number;
  technology?: ITechnology;
  mentor?: IMentor;
}

export class MentorSkill implements IMentorSkill {
  constructor(
    public id?: number,
    public selfRate?: string,
    public experience?: number,
    public technology?: ITechnology,
    public mentor?: IMentor
  ) {}
}
