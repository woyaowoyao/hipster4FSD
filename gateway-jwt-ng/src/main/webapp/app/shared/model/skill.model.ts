export interface ISkill {
  id?: number;
  name?: string;
  toc?: string;
  preprequisites?: string;
}

export class Skill implements ISkill {
  constructor(public id?: number, public name?: string, public toc?: string, public preprequisites?: string) {}
}
