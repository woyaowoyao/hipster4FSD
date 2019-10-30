import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './training-record.reducer';
import { ITrainingRecord } from 'app/shared/model/training-record.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ITrainingRecordProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ITrainingRecordState = IPaginationBaseState;

export class TrainingRecord extends React.Component<ITrainingRecordProps, ITrainingRecordState> {
  state: ITrainingRecordState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { trainingRecordList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="training-record-heading">
          Training Records
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Training Record
          </Link>
        </h2>
        <div className="table-responsive">
          {trainingRecordList && trainingRecordList.length > 0 ? (
            <Table responsive aria-describedby="training-record-heading">
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    ID <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('status')}>
                    Status <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('progress')}>
                    Progress <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('commissionAmount')}>
                    Commission Amount <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('avgRating')}>
                    Avg Rating <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('startDate')}>
                    Start Date <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('endDate')}>
                    End Date <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('startTime')}>
                    Start Time <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('endTime')}>
                    End Time <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('amountReceived')}>
                    Amount Received <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('userId')}>
                    User Id <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('userName')}>
                    User Name <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('trainingId')}>
                    Training Id <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('skillName')}>
                    Skill Name <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('fees')}>
                    Fees <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('remarks')}>
                    Remarks <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    User <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    Training <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    Skill <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {trainingRecordList.map((trainingRecord, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${trainingRecord.id}`} color="link" size="sm">
                        {trainingRecord.id}
                      </Button>
                    </td>
                    <td>{trainingRecord.status}</td>
                    <td>{trainingRecord.progress}</td>
                    <td>{trainingRecord.commissionAmount}</td>
                    <td>{trainingRecord.avgRating}</td>
                    <td>{trainingRecord.startDate}</td>
                    <td>{trainingRecord.endDate}</td>
                    <td>{trainingRecord.startTime}</td>
                    <td>{trainingRecord.endTime}</td>
                    <td>{trainingRecord.amountReceived}</td>
                    <td>{trainingRecord.userId}</td>
                    <td>{trainingRecord.userName}</td>
                    <td>{trainingRecord.trainingId}</td>
                    <td>{trainingRecord.skillName}</td>
                    <td>{trainingRecord.fees}</td>
                    <td>{trainingRecord.remarks}</td>
                    <td>{trainingRecord.user ? <Link to={`member/${trainingRecord.user.id}`}>{trainingRecord.user.id}</Link> : ''}</td>
                    <td>
                      {trainingRecord.training ? (
                        <Link to={`training/${trainingRecord.training.id}`}>{trainingRecord.training.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>{trainingRecord.skill ? <Link to={`skill/${trainingRecord.skill.id}`}>{trainingRecord.skill.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${trainingRecord.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${trainingRecord.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${trainingRecord.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Training Records found</div>
          )}
        </div>
        <div className={trainingRecordList && trainingRecordList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={this.state.activePage} total={totalItems} itemsPerPage={this.state.itemsPerPage} />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={this.state.activePage}
              onSelect={this.handlePagination}
              maxButtons={5}
              itemsPerPage={this.state.itemsPerPage}
              totalItems={this.props.totalItems}
            />
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ trainingRecord }: IRootState) => ({
  trainingRecordList: trainingRecord.entities,
  totalItems: trainingRecord.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingRecord);
