import {
  Typography,
  ListItemText,
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  Tooltip,
} from '@mui/material';

import WarehouseIcon from '@mui/icons-material/Warehouse';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';

import { Depot } from '@backend/types';
import { EntityList } from '../../../../../features/entity-list/EntityList';
import { useFocusLocation } from '../../../../../hooks/map/use-focus-location';

export type DepotItemsProps = {
  items: any[];
  isLoading: boolean;
  isError: boolean;
};

export const DepotItems = ({ items, isLoading, isError }: DepotItemsProps) => {
  const focusDepot = useFocusLocation();

  return (
    <EntityList
      dense={true}
      isLoading={isLoading}
      isError={isError}
      items={items}
      renderItem={(depot: Depot) =>
        depot ? (
          <div key={`div_${depot._id}`}>
            <ListItem
              key={depot._id}
              disablePadding
              alignItems='center'
              secondaryAction={
                <>
                  <Tooltip title='Focus Depot'>
                    <IconButton edge='end' aria-label='comments' size='small' onClick={() => focusDepot(depot)}>
                      <ZoomInMapIcon fontSize='inherit' />
                    </IconButton>
                  </Tooltip>
                </>
              }
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <WarehouseIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`Name: ${depot.name}`}
                  secondary={
                    <>
                      <Typography component='span' variant='body2' color='text.primary'>
                        {`Address: ${depot.address}`}
                      </Typography>
                      <br />
                      <Typography component='span' variant='caption' color='text.muted'>
                        {`ID: ${depot._id}`}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </ListItem>
          </div>
        ) : null
      }
    />
  );
};
