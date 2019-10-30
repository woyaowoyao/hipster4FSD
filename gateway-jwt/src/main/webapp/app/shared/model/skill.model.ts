export interface ISkill {
  id?: number;
  name?: string;
  toc?: string;
  preprequisites?: string;
}

export const defaultValue: Readonly<ISkill> = {};
