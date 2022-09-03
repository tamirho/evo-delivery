import {
  Typography,
  ListItemText,
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  Tooltip,
} from '@mui/material';

import InventoryIcon from '@mui/icons-material/Inventory';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';

import { Order } from '@backend/types';
import { EntityList } from '../../../../../features/entity-list/EntityList';
import { useFocusLocation } from '../../../../../hooks/map/use-focus-location';

export type OrderItemsProps = {
  items: any[];
  isLoading: boolean;
  isError: boolean;
};

export const OrderItems = ({ items, isLoading, isError }: OrderItemsProps) => {
  const focusOrder = useFocusLocation();

  return (
    <EntityList
      dense={true}
      isLoading={isLoading}
      isError={isError}
      items={items}
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
              <ListItem>
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
              </ListItem>
            </ListItem>
            <Divider key={`divider_${order._id}`} variant='middle' component='li' />
          </div>
        ) : null
      }
    />
  );
};
