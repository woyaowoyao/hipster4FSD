export interface ISearchTrain {
  id?: number;
  trainName?: string;
  status?: string;
}

export class SearchTrain implements ISearchTrain {
  constructor(public id?: number, public trainName?: string, public status?: string) {}
}
