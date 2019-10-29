import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PaymentRecord from './payment-record';
import PaymentRecordDetail from './payment-record-detail';
import PaymentRecordUpdate from './payment-record-update';
import PaymentRecordDeleteDialog from './payment-record-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PaymentRecordUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PaymentRecordUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PaymentRecordDetail} />
      <ErrorBoundaryRoute path={match.url} component={PaymentRecord} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PaymentRecordDeleteDialog} />
  </>
);

export default Routes;
