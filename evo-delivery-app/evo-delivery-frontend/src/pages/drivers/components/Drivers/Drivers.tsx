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
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import { useLocation, useNavigate } from 'react-router-dom';
import { EntityList } from '../../../../features/entity-list/EntityList';
import { ENTITY_VIEW_STATES } from '../../../common';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMemo } from 'react';
import { useGetEntities } from '../../../../hooks/entities-api/use-get-entities';
import { useDeleteEntity } from '../../../../hooks/entities-api/use-delete-entity';
import { useNavigateToChild } from '../../../../hooks/router/use-navigate-to-child';

export const Drivers = () => {
  const { data: drivers, isFetching, isLoading, isError } = useGetEntities();

  const goToDriver = useNavigateToChild();
  const deleteDriver = useDeleteEntity();

  return (
    <EntityList
      isLoading={isFetching || isLoading}
      isError={isError}
      items={drivers}
      renderItem={(driver: Driver) => (
        <>
          <ListItem
            key={driver._id}
            disablePadding
            alignItems='center'
            secondaryAction={
              <Tooltip title='Delete'>
                <IconButton edge='end' aria-label='comments' size='small' onClick={() => deleteDriver(driver._id)}>
                  <DeleteIcon fontSize='inherit' />
                </IconButton>
              </Tooltip>
            }
          >
            <ListItemButton onClick={() => goToDriver(driver._id)}>
              <ListItemAvatar>
                <Avatar>
                  <DriveEtaIcon />
                </Avatar>
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
                      {`Capacity: ${driver.maxCapacity}`}
                      <br />
                      {`Distance: ${driver.maxDistance}`}
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
