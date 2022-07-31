import React, { useContext, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapContext, mapActions } from '../../../../features/map/context';
import { useEntityId } from '../../../../hooks/use-entity-id';
import { ENTITY_VIEW_STATES } from '../../../common';
import { useOrder } from '../../hooks/use-order';
const mockOrder = {
  _id: `134523452345`,
  address: `some address 1`,
  latitude: [51.505, -0.09][0],
  longitude: [51.505, -0.09][1],
  shippingDate: new Date(),
  weight: 9,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const Order = () => {
  const { dispatch } = useContext(MapContext);
  const orderId = useEntityId();
  // const { data: order, isFetching, isLoading, isError } = useOrder(orderId!);

  useEffect(() => {
    dispatch({ type: mapActions.UPDATE_STATE, payload: { orders: [mockOrder], zoom: 14 } });

    return () => dispatch({ type: mapActions.CLEAR_STATE, payload: {} });
  }, []);

  return <div>Hello Order</div>;
};
