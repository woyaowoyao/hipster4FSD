import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './training-record.reducer';
import { ITrainingRecord } from 'app/shared/model/training-record.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITrainingRecordDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TrainingRecordDetail extends React.Component<ITrainingRecordDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { trainingRecordEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            TrainingRecord [<b>{trainingRecordEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="status">Status</span>
            </dt>
            <dd>{trainingRecordEntity.status}</dd>
            <dt>
              <span id="progress">Progress</span>
            </dt>
            <dd>{trainingRecordEntity.progress}</dd>
            <dt>
              <span id="commissionAmount">Commission Amount</span>
            </dt>
            <dd>{trainingRecordEntity.commissionAmount}</dd>
            <dt>
              <span id="avgRating">Avg Rating</span>
            </dt>
            <dd>{trainingRecordEntity.avgRating}</dd>
            <dt>
              <span id="startDate">Start Date</span>
            </dt>
            <dd>{trainingRecordEntity.startDate}</dd>
            <dt>
              <span id="endDate">End Date</span>
            </dt>
            <dd>{trainingRecordEntity.endDate}</dd>
            <dt>
              <span id="startTime">Start Time</span>
            </dt>
            <dd>{trainingRecordEntity.startTime}</dd>
            <dt>
              <span id="endTime">End Time</span>
            </dt>
            <dd>{trainingRecordEntity.endTime}</dd>
            <dt>
              <span id="amountReceived">Amount Received</span>
            </dt>
            <dd>{trainingRecordEntity.amountReceived}</dd>
            <dt>
              <span id="userId">User Id</span>
            </dt>
            <dd>{trainingRecordEntity.userId}</dd>
            <dt>
              <span id="userName">User Name</span>
            </dt>
            <dd>{trainingRecordEntity.userName}</dd>
            <dt>
              <span id="trainingId">Training Id</span>
            </dt>
            <dd>{trainingRecordEntity.trainingId}</dd>
            <dt>
              <span id="skillName">Skill Name</span>
            </dt>
            <dd>{trainingRecordEntity.skillName}</dd>
            <dt>
              <span id="fees">Fees</span>
            </dt>
            <dd>{trainingRecordEntity.fees}</dd>
            <dt>
              <span id="remarks">Remarks</span>
            </dt>
            <dd>{trainingRecordEntity.remarks}</dd>
            <dt>User</dt>
            <dd>{trainingRecordEntity.user ? trainingRecordEntity.user.id : ''}</dd>
            <dt>Training</dt>
            <dd>{trainingRecordEntity.training ? trainingRecordEntity.training.id : ''}</dd>
            <dt>Skill</dt>
            <dd>{trainingRecordEntity.skill ? trainingRecordEntity.skill.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/training-record" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/training-record/${trainingRecordEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ trainingRecord }: IRootState) => ({
  trainingRecordEntity: trainingRecord.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingRecordDetail);
