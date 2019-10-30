import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './training.reducer';
import { ITraining } from 'app/shared/model/training.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITrainingUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITrainingUpdateState {
  isNew: boolean;
}

export class TrainingUpdate extends React.Component<ITrainingUpdateProps, ITrainingUpdateState> {
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
      const { trainingEntity } = this.props;
      const entity = {
        ...trainingEntity,
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
    this.props.history.push('/entity/training');
  };

  render() {
    const { trainingEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.training.home.createOrEditLabel">Create or edit a Training</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : trainingEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="training-id">ID</Label>
                    <AvInput id="training-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="statusLabel" for="training-status">
                    Status
                  </Label>
                  <AvInput
                    id="training-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && trainingEntity.status) || 'Active'}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="commissionAmountLabel" for="training-commissionAmount">
                    Commission Amount
                  </Label>
                  <AvField
                    id="training-commissionAmount"
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
                  <Label id="avgRatingLabel" for="training-avgRating">
                    Avg Rating
                  </Label>
                  <AvField id="training-avgRating" type="string" className="form-control" name="avgRating" />
                </AvGroup>
                <AvGroup>
                  <Label id="startDateLabel" for="training-startDate">
                    Start Date
                  </Label>
                  <AvField
                    id="training-startDate"
                    type="text"
                    name="startDate"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endDateLabel" for="training-endDate">
                    End Date
                  </Label>
                  <AvField
                    id="training-endDate"
                    type="text"
                    name="endDate"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="startTimeLabel" for="training-startTime">
                    Start Time
                  </Label>
                  <AvField
                    id="training-startTime"
                    type="text"
                    name="startTime"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endTimeLabel" for="training-endTime">
                    End Time
                  </Label>
                  <AvField
                    id="training-endTime"
                    type="text"
                    name="endTime"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="mentorIdLabel" for="training-mentorId">
                    Mentor Id
                  </Label>
                  <AvField
                    id="training-mentorId"
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
                  <Label id="mentorNameLabel" for="training-mentorName">
                    Mentor Name
                  </Label>
                  <AvField
                    id="training-mentorName"
                    type="text"
                    name="mentorName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="skillNameLabel" for="training-skillName">
                    Skill Name
                  </Label>
                  <AvField
                    id="training-skillName"
                    type="text"
                    name="skillName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="feesLabel" for="training-fees">
                    Fees
                  </Label>
                  <AvField
                    id="training-fees"
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
                  <Label id="remarksLabel" for="training-remarks">
                    Remarks
                  </Label>
                  <AvField id="training-remarks" type="text" name="remarks" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/training" replace color="info">
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
  trainingEntity: storeState.training.entity,
  loading: storeState.training.loading,
  updating: storeState.training.updating,
  updateSuccess: storeState.training.updateSuccess
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
)(TrainingUpdate);
