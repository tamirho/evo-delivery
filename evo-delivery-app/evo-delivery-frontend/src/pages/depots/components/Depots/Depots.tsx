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
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';

import { Depot } from '@backend/types';
import { EntityList } from '../../../../features/entity-list/EntityList';
import { MapContext, mapActions } from '../../../../features/map/context';
import { useFocusLocation } from '../../../../hooks/map/use-focus-location';
import { useNavigateToChild } from '../../../../hooks/router/use-navigate-to-child';
import { useGetEntities } from '../../../../hooks/entities-api/use-get-entities';

export const Depots = () => {
  const { dispatch } = useContext(MapContext);
  const { data: depots = [], isFetching, isLoading, isError } = useGetEntities();

  useEffect(() => {
    if (depots) {
      dispatch({ type: mapActions.UPDATE_STATE, payload: { depots, zoom: 12 } });
    }

    return () => dispatch({ type: mapActions.CLEAR_STATE, payload: {} });
  }, [depots]);

  const goToDepot = useNavigateToChild();
  const focusDepot = useFocusLocation();

  return (
    <EntityList
      isLoading={isFetching || isLoading}
      isError={isError}
      items={depots}
      renderItem={(depot: Depot) =>
        depot ? (
          <div key={`div_${depot._id}`}>
            <ListItem
              key={depot._id}
              disablePadding
              alignItems='center'
              secondaryAction={
                <>
                  <Tooltip title='Focus'>
                    <IconButton edge='end' aria-label='comments' size='small' onClick={() => focusDepot(depot)}>
                      <ZoomInMapIcon fontSize='inherit' />
                    </IconButton>
                  </Tooltip>
                </>
              }
            >
              <ListItemButton onClick={() => goToDepot(depot._id)}>
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
              </ListItemButton>
            </ListItem>
            <Divider key={`divider_${depot._id}`} variant='middle' component='li' />
          </div>
        ) : null
      }
    />
  );
};
