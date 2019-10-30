import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPaymentRecord, defaultValue } from 'app/shared/model/payment-record.model';

export const ACTION_TYPES = {
  FETCH_PAYMENTRECORD_LIST: 'paymentRecord/FETCH_PAYMENTRECORD_LIST',
  FETCH_PAYMENTRECORD: 'paymentRecord/FETCH_PAYMENTRECORD',
  CREATE_PAYMENTRECORD: 'paymentRecord/CREATE_PAYMENTRECORD',
  UPDATE_PAYMENTRECORD: 'paymentRecord/UPDATE_PAYMENTRECORD',
  DELETE_PAYMENTRECORD: 'paymentRecord/DELETE_PAYMENTRECORD',
  RESET: 'paymentRecord/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPaymentRecord>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PaymentRecordState = Readonly<typeof initialState>;

// Reducer

export default (state: PaymentRecordState = initialState, action): PaymentRecordState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PAYMENTRECORD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PAYMENTRECORD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PAYMENTRECORD):
    case REQUEST(ACTION_TYPES.UPDATE_PAYMENTRECORD):
    case REQUEST(ACTION_TYPES.DELETE_PAYMENTRECORD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PAYMENTRECORD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PAYMENTRECORD):
    case FAILURE(ACTION_TYPES.CREATE_PAYMENTRECORD):
    case FAILURE(ACTION_TYPES.UPDATE_PAYMENTRECORD):
    case FAILURE(ACTION_TYPES.DELETE_PAYMENTRECORD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAYMENTRECORD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAYMENTRECORD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PAYMENTRECORD):
    case SUCCESS(ACTION_TYPES.UPDATE_PAYMENTRECORD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PAYMENTRECORD):
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

const apiUrl = 'api/payment-records';

// Actions

export const getEntities: ICrudGetAllAction<IPaymentRecord> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PAYMENTRECORD_LIST,
  payload: axios.get<IPaymentRecord>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPaymentRecord> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PAYMENTRECORD,
    payload: axios.get<IPaymentRecord>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPaymentRecord> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PAYMENTRECORD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPaymentRecord> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PAYMENTRECORD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPaymentRecord> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PAYMENTRECORD,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
