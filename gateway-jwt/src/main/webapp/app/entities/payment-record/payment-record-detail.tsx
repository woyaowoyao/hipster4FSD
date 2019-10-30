import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './payment-record.reducer';
import { IPaymentRecord } from 'app/shared/model/payment-record.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaymentRecordDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PaymentRecordDetail extends React.Component<IPaymentRecordDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { paymentRecordEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            PaymentRecord [<b>{paymentRecordEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="txnType">Txn Type</span>
            </dt>
            <dd>{paymentRecordEntity.txnType}</dd>
            <dt>
              <span id="amount">Amount</span>
            </dt>
            <dd>{paymentRecordEntity.amount}</dd>
            <dt>
              <span id="mentorId">Mentor Id</span>
            </dt>
            <dd>{paymentRecordEntity.mentorId}</dd>
            <dt>
              <span id="mentorName">Mentor Name</span>
            </dt>
            <dd>{paymentRecordEntity.mentorName}</dd>
            <dt>
              <span id="trainingId">Training Id</span>
            </dt>
            <dd>{paymentRecordEntity.trainingId}</dd>
            <dt>
              <span id="skillName">Skill Name</span>
            </dt>
            <dd>{paymentRecordEntity.skillName}</dd>
            <dt>
              <span id="totalAmountToMentor">Total Amount To Mentor</span>
            </dt>
            <dd>{paymentRecordEntity.totalAmountToMentor}</dd>
            <dt>
              <span id="remarks">Remarks</span>
            </dt>
            <dd>{paymentRecordEntity.remarks}</dd>
            <dt>User</dt>
            <dd>{paymentRecordEntity.user ? paymentRecordEntity.user.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/payment-record" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/payment-record/${paymentRecordEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ paymentRecord }: IRootState) => ({
  paymentRecordEntity: paymentRecord.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentRecordDetail);
