import { Driver } from '@backend/types';
import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import { EntityList } from '../../../../features/entity-list/EntityList';
import { useGetEntities } from '../../../../hooks/entities/use-get-entities';
import { useNavigateToChild } from '../../../../hooks/router/use-navigate-to-child';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import { useDeleteEntity } from '../../../../hooks/entities/use-delete-entity';
import { DriverAvatar } from '../DriverAvatar/DriverAvatar';

export const Drivers = () => {
  const { data: drivers, isFetching, isLoading, isError } = useGetEntities();

  const goToDriver = useNavigateToChild();
  const deleteDriver = useDeleteEntity();

  return (
    <EntityList
      isLoading={isFetching || isLoading}
      isError={isError}
      items={drivers}
      withFilter={(obj, text) =>
        (obj._id as string).toLowerCase().includes(text.toLowerCase()) ||
        (obj.name as string).toLowerCase().includes(text.toLowerCase())
      }
      filterPlaceholder={'Filter drivers by id or name'}
      renderItem={(driver: Driver) => (
        <>
          <ListItem
            key={driver._id}
            disablePadding
            alignItems='center'
            secondaryAction={
              <Tooltip title='Delete'>
                <IconButton
                  edge='end'
                  aria-label='comments'
                  size='small'
                  onClick={() => deleteDriver(driver._id as string)}
                >
                  <DeleteIcon fontSize='inherit' />
                </IconButton>
              </Tooltip>
            }
          >
            <ListItemButton onClick={() => goToDriver(driver._id)}>
              <ListItemAvatar>
                <DriverAvatar name={driver.name} />
              </ListItemAvatar>
              <ListItemText
                primary={`ID: ${driver._id}`}
                secondary={
                  <>
                    <Typography sx={{ display: 'inline' }} component='span' variant='body2' color='text.primary'>
                      {`Name: ${driver.name}`}
                    </Typography>
                    <br />
                    <Typography component='span' variant='caption' color='text.muted'>
                      {`Capacity: ${driver.maxCapacity} KGs`}
                      <br />
                      {`Distance: ${driver.maxDistance} KMs`}
                    </Typography>
                  </>
                }
              />
            </ListItemButton>
          </ListItem>
          <Divider key={`divider_${driver._id}`} variant='middle' component='li' />
        </>
      )}
    />
  );
};
