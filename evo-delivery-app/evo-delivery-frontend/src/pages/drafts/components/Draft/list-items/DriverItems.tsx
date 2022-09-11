import { Typography, ListItemText, Divider, ListItem, ListItemAvatar } from '@mui/material';

import { Driver } from '@backend/types';
import { EntityList } from '../../../../../features/entity-list/EntityList';
import { DriverAvatar } from '../../../../drivers/components/DriverAvatar/DriverAvatar';

export type DriverItemsProps = {
  items: any[];
  isLoading: boolean;
  isError: boolean;
};

export const DriverItems = ({ items, isLoading, isError }: DriverItemsProps) => {
  return (
    <EntityList
      dense={true}
      isLoading={isLoading}
      isError={isError}
      items={items}
      renderItem={(driver: Driver) =>
        driver ? (
          <div key={`div_${driver._id}`}>
            <ListItem key={driver._id} disablePadding alignItems='center'>
              <ListItem>
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
                        {`Capacity: ${driver.maxCapacity}`}
                        <br />
                        {`Distance: ${driver.maxDistance}`}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </ListItem>
            <Divider key={`divider_${driver._id}`} variant='middle' component='li' />
          </div>
        ) : null
      }
    />
  );
};
