import { Order, Depot, EaEvaluateResponse } from '@backend/types';
import { LatLngExpression } from 'leaflet';
import { DEFAULT_CENTER_POSITION, DEFAULT_MAP_ZOOM } from '../common/constants';

export type mapState = {
  center?: LatLngExpression;
  orders?: Order[];
  depots?: Depot[];
  routes?: EaEvaluateResponse;
  zoom?: number;
};

export type mapAction = { type: string; payload: mapState };

export const initialState: mapState = {
  center: DEFAULT_CENTER_POSITION,
  orders: [],
  depots: [],
  routes: {},
  zoom: DEFAULT_MAP_ZOOM,
};

export const mapActions = {
  UPDATE_STATE: 'UPDATE_STATE',
  UPDATE_CENTER: 'UPDATE_CENTER',
  UPDATE_ORDERS: 'UPDATE_ORDERS',
  UPDATE_DEPOTS: 'UPDATE_DEPOTS',
  UPDATE_ROUTES: 'UPDATE_ROUTES',
  UPDATE_ZOOM: 'UPDATE_ZOOM',
  CLEAR_ORDERS: 'CLEAR_ORDERS',
  CLEAR_DEPOTS: 'CLEAR_DEPOTS',
  CLEAR_ROUTES: 'CLEAR_ROUTES',
  CLEAR_ZOOM: 'CLEAR_ZOOM',
  CLEAR_STATE: 'CLEAR_STATE',
};

export const mapReducer = (state: mapState, action: mapAction) => {
  switch (action.type) {
    case mapActions.UPDATE_STATE:
      return { ...state, ...action.payload };
    case mapActions.UPDATE_CENTER:
      return { ...state, center: action.payload.center || DEFAULT_CENTER_POSITION };
    case mapActions.UPDATE_ORDERS:
      return { ...state, orders: [...(action.payload.orders ?? [])] };
    case mapActions.UPDATE_DEPOTS:
      return { ...state, depots: [...(action.payload.depots ?? [])] };
    case mapActions.UPDATE_ROUTES:
      return { ...state, routes: { ...(action.payload.routes ?? {}) } };
    case mapActions.UPDATE_ZOOM:
      return { ...state, zoom: action.payload.zoom || DEFAULT_MAP_ZOOM };
    case mapActions.CLEAR_ORDERS:
      return { ...state, orders: [] };
    case mapActions.CLEAR_DEPOTS:
      return { ...state, depots: [] };
    case mapActions.CLEAR_ROUTES:
      return { ...state, routes: {} };
    case mapActions.CLEAR_ZOOM:
      return { ...state, zoom: DEFAULT_MAP_ZOOM };
    case mapActions.CLEAR_STATE:
      return { ...initialState };
    default:
      return state;
  }
};
