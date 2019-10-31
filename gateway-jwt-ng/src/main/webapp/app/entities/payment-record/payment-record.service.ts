import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPaymentRecord } from 'app/shared/model/payment-record.model';

type EntityResponseType = HttpResponse<IPaymentRecord>;
type EntityArrayResponseType = HttpResponse<IPaymentRecord[]>;

@Injectable({ providedIn: 'root' })
export class PaymentRecordService {
  public resourceUrl = SERVER_API_URL + 'api/payment-records';

  constructor(protected http: HttpClient) {}

  create(paymentRecord: IPaymentRecord): Observable<EntityResponseType> {
    return this.http.post<IPaymentRecord>(this.resourceUrl, paymentRecord, { observe: 'response' });
  }

  update(paymentRecord: IPaymentRecord): Observable<EntityResponseType> {
    return this.http.put<IPaymentRecord>(this.resourceUrl, paymentRecord, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPaymentRecord>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPaymentRecord[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
