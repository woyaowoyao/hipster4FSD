export interface ICourse {
  id?: number;
  courseName?: string;
  topic?: string;
}

export class Course implements ICourse {
  constructor(public id?: number, public courseName?: string, public topic?: string) {}
}
