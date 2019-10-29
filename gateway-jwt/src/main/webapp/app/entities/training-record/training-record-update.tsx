import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './training-record.reducer';
import { ITrainingRecord } from 'app/shared/model/training-record.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITrainingRecordUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITrainingRecordUpdateState {
  isNew: boolean;
}

export class TrainingRecordUpdate extends React.Component<ITrainingRecordUpdateProps, ITrainingRecordUpdateState> {
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
      const { trainingRecordEntity } = this.props;
      const entity = {
        ...trainingRecordEntity,
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
    this.props.history.push('/entity/training-record');
  };

  render() {
    const { trainingRecordEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.trainingRecord.home.createOrEditLabel">Create or edit a TrainingRecord</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : trainingRecordEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="training-record-id">ID</Label>
                    <AvInput id="training-record-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="statusLabel" for="training-record-status">
                    Status
                  </Label>
                  <AvField
                    id="training-record-status"
                    type="text"
                    name="status"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="progressLabel" for="training-record-progress">
                    Progress
                  </Label>
                  <AvField
                    id="training-record-progress"
                    type="string"
                    className="form-control"
                    name="progress"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="commissionAmountLabel" for="training-record-commissionAmount">
                    Commission Amount
                  </Label>
                  <AvField
                    id="training-record-commissionAmount"
                    type="string"
                    className="form-control"
                    name="commissionAmount"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="avgRatingLabel" for="training-record-avgRating">
                    Avg Rating
                  </Label>
                  <AvField
                    id="training-record-avgRating"
                    type="string"
                    className="form-control"
                    name="avgRating"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="startDateLabel" for="training-record-startDate">
                    Start Date
                  </Label>
                  <AvField
                    id="training-record-startDate"
                    type="text"
                    name="startDate"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endDateLabel" for="training-record-endDate">
                    End Date
                  </Label>
                  <AvField
                    id="training-record-endDate"
                    type="text"
                    name="endDate"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="startTimeLabel" for="training-record-startTime">
                    Start Time
                  </Label>
                  <AvField
                    id="training-record-startTime"
                    type="text"
                    name="startTime"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endTimeLabel" for="training-record-endTime">
                    End Time
                  </Label>
                  <AvField
                    id="training-record-endTime"
                    type="text"
                    name="endTime"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="amountReceivedLabel" for="training-record-amountReceived">
                    Amount Received
                  </Label>
                  <AvField
                    id="training-record-amountReceived"
                    type="string"
                    className="form-control"
                    name="amountReceived"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="userIdLabel" for="training-record-userId">
                    User Id
                  </Label>
                  <AvField
                    id="training-record-userId"
                    type="string"
                    className="form-control"
                    name="userId"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="userNameLabel" for="training-record-userName">
                    User Name
                  </Label>
                  <AvField
                    id="training-record-userName"
                    type="text"
                    name="userName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="mentorIdLabel" for="training-record-mentorId">
                    Mentor Id
                  </Label>
                  <AvField
                    id="training-record-mentorId"
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
                  <Label id="mentorNameLabel" for="training-record-mentorName">
                    Mentor Name
                  </Label>
                  <AvField
                    id="training-record-mentorName"
                    type="text"
                    name="mentorName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="trainingIdLabel" for="training-record-trainingId">
                    Training Id
                  </Label>
                  <AvField
                    id="training-record-trainingId"
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
                  <Label id="skillNameLabel" for="training-record-skillName">
                    Skill Name
                  </Label>
                  <AvField
                    id="training-record-skillName"
                    type="text"
                    name="skillName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="feesLabel" for="training-record-fees">
                    Fees
                  </Label>
                  <AvField
                    id="training-record-fees"
                    type="string"
                    className="form-control"
                    name="fees"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="remarksLabel" for="training-record-remarks">
                    Remarks
                  </Label>
                  <AvField id="training-record-remarks" type="text" name="remarks" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/training-record" replace color="info">
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
  trainingRecordEntity: storeState.trainingRecord.entity,
  loading: storeState.trainingRecord.loading,
  updating: storeState.trainingRecord.updating,
  updateSuccess: storeState.trainingRecord.updateSuccess
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
)(TrainingRecordUpdate);
