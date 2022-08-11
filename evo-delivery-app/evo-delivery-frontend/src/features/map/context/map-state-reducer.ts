import { Order, Depot, EaEvaluateResponse } from '@backend/types';
import { LatLngExpression } from 'leaflet';
import { DEFAULT_CENTER_POSITION, DEFAULT_MAP_ZOOM } from '../common/constants';
import {DriverRoute, EvaluateResult} from "../../../../../evo-delivery-backend/src/types";

export type mapState = {
  center?: LatLngExpression;
  orders?: Order[];
  depots?: Depot[];
  routes?: DriverRoute[];
  routesColors?: string[]
  zoom?: number;
};

export type mapAction = { type: string; payload: mapState };

export const initialState: mapState = {
  center: DEFAULT_CENTER_POSITION,
  orders: [],
  depots: [],
  routes: [],
  zoom: DEFAULT_MAP_ZOOM,
};

export const mapActions = {
  UPDATE_STATE: 'UPDATE_STATE',
  UPDATE_CENTER: 'UPDATE_CENTER',
  UPDATE_ORDERS: 'UPDATE_ORDERS',
  UPDATE_DEPOTS: 'UPDATE_DEPOTS',
  UPDATE_RESULTS: 'UPDATE_RESULTS',
  UPDATE_ZOOM: 'UPDATE_ZOOM',
  CLEAR_ORDERS: 'CLEAR_ORDERS',
  CLEAR_DEPOTS: 'CLEAR_DEPOTS',
  CLEAR_RESULTS: 'CLEAR_RESULTS',
  CLEAR_ZOOM: 'CLEAR_ZOOM',
  CLEAR_STATE: 'CLEAR_STATE',
  INIT_STATE: 'INIT_STATE',
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
    case mapActions.UPDATE_RESULTS:
      return { ...state, result: { ...(action.payload.routes ?? {}) } };
    case mapActions.UPDATE_ZOOM:
      return { ...state, zoom: action.payload.zoom || DEFAULT_MAP_ZOOM };
    case mapActions.CLEAR_ORDERS:
      return { ...state, orders: [] };
    case mapActions.CLEAR_DEPOTS:
      return { ...state, depots: [] };
    case mapActions.CLEAR_RESULTS:
      return { ...state, result: {} };
    case mapActions.CLEAR_ZOOM:
      return { ...state, zoom: DEFAULT_MAP_ZOOM };
    case mapActions.CLEAR_STATE:
      const { zoom, center } = state;
      return { ...initialState, zoom, center };
    case mapActions.INIT_STATE:
      return { ...initialState };
    default:
      return state;
  }
};
