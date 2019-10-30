import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './training.reducer';
import { ITraining } from 'app/shared/model/training.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITrainingProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Training extends React.Component<ITrainingProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { trainingList, match } = this.props;
    return (
      <div>
        <h2 id="training-heading">
          Trainings
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Training
          </Link>
        </h2>
        <div className="table-responsive">
          {trainingList && trainingList.length > 0 ? (
            <Table responsive aria-describedby="training-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Commission Amount</th>
                  <th>Avg Rating</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Mentor Id</th>
                  <th>Mentor Name</th>
                  <th>Skill Name</th>
                  <th>Fees</th>
                  <th>Remarks</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {trainingList.map((training, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${training.id}`} color="link" size="sm">
                        {training.id}
                      </Button>
                    </td>
                    <td>{training.status}</td>
                    <td>{training.commissionAmount}</td>
                    <td>{training.avgRating}</td>
                    <td>{training.startDate}</td>
                    <td>{training.endDate}</td>
                    <td>{training.startTime}</td>
                    <td>{training.endTime}</td>
                    <td>{training.mentorId}</td>
                    <td>{training.mentorName}</td>
                    <td>{training.skillName}</td>
                    <td>{training.fees}</td>
                    <td>{training.remarks}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${training.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${training.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${training.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Trainings found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ training }: IRootState) => ({
  trainingList: training.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Training);
