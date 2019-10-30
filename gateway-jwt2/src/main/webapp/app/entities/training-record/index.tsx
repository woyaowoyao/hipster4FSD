import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TrainingRecord from './training-record';
import TrainingRecordDetail from './training-record-detail';
import TrainingRecordUpdate from './training-record-update';
import TrainingRecordDeleteDialog from './training-record-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TrainingRecordUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TrainingRecordUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TrainingRecordDetail} />
      <ErrorBoundaryRoute path={match.url} component={TrainingRecord} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TrainingRecordDeleteDialog} />
  </>
);

export default Routes;
