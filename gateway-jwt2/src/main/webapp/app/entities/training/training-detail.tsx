import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './training.reducer';
import { ITraining } from 'app/shared/model/training.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITrainingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TrainingDetail extends React.Component<ITrainingDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { trainingEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Training [<b>{trainingEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="status">Status</span>
            </dt>
            <dd>{trainingEntity.status}</dd>
            <dt>
              <span id="commissionAmount">Commission Amount</span>
            </dt>
            <dd>{trainingEntity.commissionAmount}</dd>
            <dt>
              <span id="avgRating">Avg Rating</span>
            </dt>
            <dd>{trainingEntity.avgRating}</dd>
            <dt>
              <span id="startDate">Start Date</span>
            </dt>
            <dd>{trainingEntity.startDate}</dd>
            <dt>
              <span id="endDate">End Date</span>
            </dt>
            <dd>{trainingEntity.endDate}</dd>
            <dt>
              <span id="startTime">Start Time</span>
            </dt>
            <dd>{trainingEntity.startTime}</dd>
            <dt>
              <span id="endTime">End Time</span>
            </dt>
            <dd>{trainingEntity.endTime}</dd>
            <dt>
              <span id="mentorId">Mentor Id</span>
            </dt>
            <dd>{trainingEntity.mentorId}</dd>
            <dt>
              <span id="mentorName">Mentor Name</span>
            </dt>
            <dd>{trainingEntity.mentorName}</dd>
            <dt>
              <span id="skillName">Skill Name</span>
            </dt>
            <dd>{trainingEntity.skillName}</dd>
            <dt>
              <span id="fees">Fees</span>
            </dt>
            <dd>{trainingEntity.fees}</dd>
            <dt>
              <span id="remarks">Remarks</span>
            </dt>
            <dd>{trainingEntity.remarks}</dd>
          </dl>
          <Button tag={Link} to="/entity/training" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/training/${trainingEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ training }: IRootState) => ({
  trainingEntity: training.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingDetail);
