import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './payment-record.reducer';
import { IPaymentRecord } from 'app/shared/model/payment-record.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaymentRecordProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class PaymentRecord extends React.Component<IPaymentRecordProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { paymentRecordList, match } = this.props;
    return (
      <div>
        <h2 id="payment-record-heading">
          Payment Records
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Payment Record
          </Link>
        </h2>
        <div className="table-responsive">
          {paymentRecordList && paymentRecordList.length > 0 ? (
            <Table responsive aria-describedby="payment-record-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Txn Type</th>
                  <th>Amount</th>
                  <th>Mentor Id</th>
                  <th>Mentor Name</th>
                  <th>Training Id</th>
                  <th>Skill Name</th>
                  <th>Total Amount To Mentor</th>
                  <th>Remarks</th>
                  <th>User</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {paymentRecordList.map((paymentRecord, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${paymentRecord.id}`} color="link" size="sm">
                        {paymentRecord.id}
                      </Button>
                    </td>
                    <td>{paymentRecord.txnType}</td>
                    <td>{paymentRecord.amount}</td>
                    <td>{paymentRecord.mentorId}</td>
                    <td>{paymentRecord.mentorName}</td>
                    <td>{paymentRecord.trainingId}</td>
                    <td>{paymentRecord.skillName}</td>
                    <td>{paymentRecord.totalAmountToMentor}</td>
                    <td>{paymentRecord.remarks}</td>
                    <td>{paymentRecord.user ? <Link to={`member/${paymentRecord.user.id}`}>{paymentRecord.user.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${paymentRecord.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${paymentRecord.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${paymentRecord.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Payment Records found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ paymentRecord }: IRootState) => ({
  paymentRecordList: paymentRecord.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentRecord);
