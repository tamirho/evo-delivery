import { Order } from '@backend/types';
import { useContext } from 'react';
import { OrderMarker } from '../markers/OrderMarker';
import { MapContext } from '../context';

export const OrdersDrawer = () => {
  const { state: mapState } = useContext(MapContext);
  const { orders } = mapState;

  return (
    <>
      {orders?.map((order: Order) => (
        <OrderMarker key={order._id} order={order} />
      ))}
    </>
  );
};
