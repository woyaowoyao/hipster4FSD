import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMyCalendar } from 'app/shared/model/trainings/my-calendar.model';

type EntityResponseType = HttpResponse<IMyCalendar>;
type EntityArrayResponseType = HttpResponse<IMyCalendar[]>;

@Injectable({ providedIn: 'root' })
export class MyCalendarService {
  public resourceUrl = SERVER_API_URL + 'services/trainings/api/my-calendars';

  constructor(protected http: HttpClient) {}

  create(myCalendar: IMyCalendar): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(myCalendar);
    return this.http
      .post<IMyCalendar>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(myCalendar: IMyCalendar): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(myCalendar);
    return this.http
      .put<IMyCalendar>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMyCalendar>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMyCalendar[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(myCalendar: IMyCalendar): IMyCalendar {
    const copy: IMyCalendar = Object.assign({}, myCalendar, {
      calDate: myCalendar.calDate != null && myCalendar.calDate.isValid() ? myCalendar.calDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.calDate = res.body.calDate != null ? moment(res.body.calDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((myCalendar: IMyCalendar) => {
        myCalendar.calDate = myCalendar.calDate != null ? moment(myCalendar.calDate) : null;
      });
    }
    return res;
  }
}
