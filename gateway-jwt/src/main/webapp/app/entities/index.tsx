import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PaymentRecord from './payment-record';
import TrainingRecord from './training-record';
import Skill from './skill';
import Member from './member';
import Training from './training';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/payment-record`} component={PaymentRecord} />
      <ErrorBoundaryRoute path={`${match.url}/training-record`} component={TrainingRecord} />
      <ErrorBoundaryRoute path={`${match.url}/skill`} component={Skill} />
      <ErrorBoundaryRoute path={`${match.url}/member`} component={Member} />
      <ErrorBoundaryRoute path={`${match.url}/training`} component={Training} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
