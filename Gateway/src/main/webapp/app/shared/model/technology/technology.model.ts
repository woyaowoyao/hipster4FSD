export interface ITechnology {
  id?: number;
  name?: string;
  toc?: string;
  preprequisites?: string;
}

export class Technology implements ITechnology {
  constructor(public id?: number, public name?: string, public toc?: string, public preprequisites?: string) {}
}
