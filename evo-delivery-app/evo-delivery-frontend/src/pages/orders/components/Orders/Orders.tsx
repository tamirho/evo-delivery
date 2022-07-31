import { useContext, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  IconButton,
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import DeleteIcon from '@mui/icons-material/Delete';

import { Order } from '@backend/types';
import { EntityList } from '../../../../features/entity-list/EntityList';
import { MapContext, mapActions } from '../../../../features/map/context';
import { useOrders } from '../../hooks/use-orders';
import { ENTITY_VIEW_STATES } from '../../../';

const depot = {
  _id: '178988452345',
  name: 'Nice Depot',
  address: 'some address 2',
  latitude: [52.489471, -1.898575][0],
  longitude: [52.489471, -1.898575][1],
  shippingDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};
const orders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => ({
  _id: `134523452345${item}${index}`,
  address: `some address ${item}${index}`,
  latitude: [51.505 + 0.01 * index, -0.09 - 0.01 * item][0],
  longitude: [51.505 + 0.001 * index, -0.09 - 0.0001 * item][1],
  shippingDate: new Date(),
  weight: (9 + index) * item,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

export const Orders = () => {
  const { dispatch } = useContext(MapContext);
  const { data, isFetching, isLoading, isError } = useOrders();

  const navigate = useNavigate();
  const location = useLocation();
  const goToEntity = useMemo(() => (id: string) => navigate(`${id}/${ENTITY_VIEW_STATES.view}${location.search}`), []);

  useEffect(() => {
    dispatch({ type: mapActions.UPDATE_STATE, payload: { orders: orders, depots: [depot], zoom: 13 } });

    return () => dispatch({ type: mapActions.CLEAR_STATE, payload: {} });
  }, []);

  const focusOrder = useMemo(
    () => (order: Order) =>
      dispatch({ type: mapActions.UPDATE_STATE, payload: { center: [order.latitude!, order.longitude!], zoom: 17 } }),
    []
  );

  return (
    <EntityList
      isLoading={false && (isFetching || isLoading)}
      isError={false && isError}
      items={orders}
      renderItem={(order: Order) => (
        <>
          <ListItem
            key={order._id}
            disablePadding
            alignItems='center'
            secondaryAction={
              <IconButton edge='end' aria-label='comments'>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton onClick={() => goToEntity(order._id)} onMouseEnter={() => focusOrder(order)}>
              <ListItemAvatar>
                <Avatar>
                  <InventoryIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`ID: ${order._id}`}
                secondary={
                  <>
                    <Typography sx={{ display: 'inline' }} component='span' variant='body2' color='text.primary'>
                      {`${order.address}`}
                    </Typography>
                    {` - ${order.shippingDate.toDateString()}`}
                  </>
                }
              />
              <ListItemSecondaryAction></ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
          <Divider key={`divider_${order._id}`} variant='middle' component='li' />
        </>
      )}
    />
  );
};
