import { useContext, useEffect } from 'react';
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import DeleteIcon from '@mui/icons-material/Delete';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';

import { Order } from '@backend/types';
import { EntityList } from '../../../../features/entity-list/EntityList';
import { MapContext, mapActions } from '../../../../features/map/context';
import { useFocusLocation } from '../../../../hooks/map/use-focus-location';
import { useNavigateToChild } from '../../../../hooks/router/use-navigate-to-child';
import { useGetEntities } from '../../../../hooks/entities/use-get-entities';
import { useDeleteEntity } from '../../../../hooks/entities/use-delete-entity';

export const Orders = () => {
  const { dispatch } = useContext(MapContext);
  const { data: orders = [], isFetching, isLoading, isError } = useGetEntities();

  const goToOrder = useNavigateToChild();
  const deleteOrder = useDeleteEntity();
  const focusOrder = useFocusLocation();

  useEffect(() => {
    if (orders) {
      dispatch({ type: mapActions.UPDATE_STATE, payload: { orders } });
    }

    return () => dispatch({ type: mapActions.CLEAR_STATE, payload: {} });
  }, [orders]);

  return (
    <EntityList
      isLoading={isFetching || isLoading}
      isError={isError}
      items={orders}
      renderItem={(order: Order) =>
        order ? (
          <div key={`div_${order._id}`}>
            <ListItem
              key={order._id}
              disablePadding
              alignItems='center'
              secondaryAction={
                <>
                  <Tooltip title='Focus Order'>
                    <IconButton edge='end' aria-label='comments' size='small' onClick={() => focusOrder(order)}>
                      <ZoomInMapIcon fontSize='inherit' />
                    </IconButton>
                  </Tooltip>
                </>
              }
            >
              <ListItemButton onClick={() => goToOrder(order._id)}>
                <ListItemAvatar>
                  <Avatar>
                    <InventoryIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`ID: ${order._id}`}
                  secondary={
                    <>
                      <Typography component='span' variant='body2' color='text.primary'>
                        {`Address: ${order.address}`}
                      </Typography>
                      <br />
                      <Typography component='span' variant='caption' color='text.muted'>
                        {`Shipping date: ${new Date(order.shippingDate as string).toDateString()}`}
                      </Typography>
                    </>
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider key={`divider_${order._id}`} variant='middle' component='li' />
          </div>
        ) : null
      }
    />
  );
};
