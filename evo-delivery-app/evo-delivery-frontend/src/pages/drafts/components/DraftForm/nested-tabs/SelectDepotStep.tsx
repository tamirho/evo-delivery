import { useContext, useEffect } from 'react';
import { TextField, Autocomplete, IconButton, Box, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { useGetEntitiesByName } from '../../../../../hooks/entities/use-get-entities-by-name';
import { useFocusLocation } from '../../../../../hooks/map/use-focus-location';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import { mapActions, MapContext } from '../../../../../features/map/context';
import { ENTITIES } from '../../../../common';

export const SelectDepotLabel = () => {
  const { watch } = useFormContext();
  const watchedDepot = watch('data.depot');

  return watchedDepot ? <span>{watchedDepot.name}</span> : null
}

export const SelectDepotStep = () => {
  const { control, getValues } = useFormContext();
  const { dispatch } = useContext(MapContext);
  const { data: depots, isLoading, isFetching } = useGetEntitiesByName(ENTITIES.depots);
  const focusDepot = useFocusLocation();

  useEffect(() => {
    if (depots) {
      dispatch({ type: mapActions.UPDATE_STATE, payload: { depots: depots } });
    }

    return () => {
      const selectedDepot = getValues('data.depot');
      dispatch({ type: mapActions.UPDATE_STATE, payload: { depots: selectedDepot ? [selectedDepot] : [] } });
    };
  }, [depots]);

  return (
    <Controller
      name='data.depot'
      control={control}
      render={({ field, fieldState, formState }) => (
        <Autocomplete
          {...field}
          {...fieldState}
          {...formState}
          options={depots || []}
          value={field.value || null}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          renderOption={(props, option) => (
            <li {...props} style={{ justifyContent: 'space-between' }}>
              <Box>
                {`Name: ${option.name}`}
                <br />
                <Typography component='span' variant='body2' color='text.primary'>
                  {`Address: ${option.address}`}
                </Typography>
                <br />
                <Typography component='span' variant='caption' color='text.muted'>
                  {`ID: ${option._id}`}
                </Typography>
              </Box>

              <IconButton
                edge='end'
                aria-label='comments'
                size='small'
                onClick={(e) => {
                  focusDepot(option);
                  e.stopPropagation();
                }}
              >
                <ZoomInMapIcon fontSize='inherit' />
              </IconButton>
            </li>
          )}
          onChange={(event, depot) => {
            if (depot) {
              focusDepot(depot);
            }
            return field.onChange(depot);
          }}
          loading={isLoading || isFetching}
          id='select-depot-autocomplete'
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label='Select Depot' />}
        />
      )}
    />
  );
};
