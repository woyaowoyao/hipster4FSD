import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISearchTrain } from 'app/shared/model/search-train.model';

type EntityResponseType = HttpResponse<ISearchTrain>;
type EntityArrayResponseType = HttpResponse<ISearchTrain[]>;

@Injectable({ providedIn: 'root' })
export class SearchTrainService {
  public resourceUrl = SERVER_API_URL + 'api/search-trains';

  constructor(protected http: HttpClient) {}

  create(searchTrain: ISearchTrain): Observable<EntityResponseType> {
    return this.http.post<ISearchTrain>(this.resourceUrl, searchTrain, { observe: 'response' });
  }

  update(searchTrain: ISearchTrain): Observable<EntityResponseType> {
    return this.http.put<ISearchTrain>(this.resourceUrl, searchTrain, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISearchTrain>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISearchTrain[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
