import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SearchTrain } from 'app/shared/model/search-train.model';
import { SearchTrainService } from './search-train.service';
import { SearchTrainComponent } from './search-train.component';
import { SearchTrainDetailComponent } from './search-train-detail.component';
import { SearchTrainUpdateComponent } from './search-train-update.component';
import { SearchTrainDeletePopupComponent } from './search-train-delete-dialog.component';
import { ISearchTrain } from 'app/shared/model/search-train.model';

@Injectable({ providedIn: 'root' })
export class SearchTrainResolve implements Resolve<ISearchTrain> {
  constructor(private service: SearchTrainService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISearchTrain> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SearchTrain>) => response.ok),
        map((searchTrain: HttpResponse<SearchTrain>) => searchTrain.body)
      );
    }
    return of(new SearchTrain());
  }
}

export const searchTrainRoute: Routes = [
  {
    path: '',
    component: SearchTrainComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'SearchTrains'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SearchTrainDetailComponent,
    resolve: {
      searchTrain: SearchTrainResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SearchTrains'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SearchTrainUpdateComponent,
    resolve: {
      searchTrain: SearchTrainResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SearchTrains'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SearchTrainUpdateComponent,
    resolve: {
      searchTrain: SearchTrainResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SearchTrains'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const searchTrainPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SearchTrainDeletePopupComponent,
    resolve: {
      searchTrain: SearchTrainResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SearchTrains'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
