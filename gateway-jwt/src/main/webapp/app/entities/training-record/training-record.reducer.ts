import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITrainingRecord, defaultValue } from 'app/shared/model/training-record.model';

export const ACTION_TYPES = {
  FETCH_TRAININGRECORD_LIST: 'trainingRecord/FETCH_TRAININGRECORD_LIST',
  FETCH_TRAININGRECORD: 'trainingRecord/FETCH_TRAININGRECORD',
  CREATE_TRAININGRECORD: 'trainingRecord/CREATE_TRAININGRECORD',
  UPDATE_TRAININGRECORD: 'trainingRecord/UPDATE_TRAININGRECORD',
  DELETE_TRAININGRECORD: 'trainingRecord/DELETE_TRAININGRECORD',
  RESET: 'trainingRecord/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITrainingRecord>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TrainingRecordState = Readonly<typeof initialState>;

// Reducer

export default (state: TrainingRecordState = initialState, action): TrainingRecordState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TRAININGRECORD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TRAININGRECORD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TRAININGRECORD):
    case REQUEST(ACTION_TYPES.UPDATE_TRAININGRECORD):
    case REQUEST(ACTION_TYPES.DELETE_TRAININGRECORD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TRAININGRECORD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TRAININGRECORD):
    case FAILURE(ACTION_TYPES.CREATE_TRAININGRECORD):
    case FAILURE(ACTION_TYPES.UPDATE_TRAININGRECORD):
    case FAILURE(ACTION_TYPES.DELETE_TRAININGRECORD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRAININGRECORD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRAININGRECORD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TRAININGRECORD):
    case SUCCESS(ACTION_TYPES.UPDATE_TRAININGRECORD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TRAININGRECORD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/training-records';

// Actions

export const getEntities: ICrudGetAllAction<ITrainingRecord> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TRAININGRECORD_LIST,
    payload: axios.get<ITrainingRecord>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ITrainingRecord> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TRAININGRECORD,
    payload: axios.get<ITrainingRecord>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITrainingRecord> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRAININGRECORD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITrainingRecord> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TRAININGRECORD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITrainingRecord> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TRAININGRECORD,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
