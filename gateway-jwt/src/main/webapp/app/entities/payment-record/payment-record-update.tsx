import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './payment-record.reducer';
import { IPaymentRecord } from 'app/shared/model/payment-record.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPaymentRecordUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPaymentRecordUpdateState {
  isNew: boolean;
}

export class PaymentRecordUpdate extends React.Component<IPaymentRecordUpdateProps, IPaymentRecordUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { paymentRecordEntity } = this.props;
      const entity = {
        ...paymentRecordEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/payment-record');
  };

  render() {
    const { paymentRecordEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.paymentRecord.home.createOrEditLabel">Create or edit a PaymentRecord</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : paymentRecordEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="payment-record-id">ID</Label>
                    <AvInput id="payment-record-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="txnTypeLabel" for="payment-record-txnType">
                    Txn Type
                  </Label>
                  <AvField
                    id="payment-record-txnType"
                    type="text"
                    name="txnType"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="amountLabel" for="payment-record-amount">
                    Amount
                  </Label>
                  <AvField
                    id="payment-record-amount"
                    type="string"
                    className="form-control"
                    name="amount"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="mentorIdLabel" for="payment-record-mentorId">
                    Mentor Id
                  </Label>
                  <AvField
                    id="payment-record-mentorId"
                    type="string"
                    className="form-control"
                    name="mentorId"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="mentorNameLabel" for="payment-record-mentorName">
                    Mentor Name
                  </Label>
                  <AvField
                    id="payment-record-mentorName"
                    type="text"
                    name="mentorName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="trainingIdLabel" for="payment-record-trainingId">
                    Training Id
                  </Label>
                  <AvField
                    id="payment-record-trainingId"
                    type="string"
                    className="form-control"
                    name="trainingId"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="skillNameLabel" for="payment-record-skillName">
                    Skill Name
                  </Label>
                  <AvField
                    id="payment-record-skillName"
                    type="text"
                    name="skillName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="totalAmountToMentorLabel" for="payment-record-totalAmountToMentor">
                    Total Amount To Mentor
                  </Label>
                  <AvField
                    id="payment-record-totalAmountToMentor"
                    type="string"
                    className="form-control"
                    name="totalAmountToMentor"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="remarksLabel" for="payment-record-remarks">
                    Remarks
                  </Label>
                  <AvField id="payment-record-remarks" type="text" name="remarks" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/payment-record" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  paymentRecordEntity: storeState.paymentRecord.entity,
  loading: storeState.paymentRecord.loading,
  updating: storeState.paymentRecord.updating,
  updateSuccess: storeState.paymentRecord.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentRecordUpdate);
