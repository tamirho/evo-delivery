import { useContext, useEffect } from 'react';
import { TextField, Autocomplete, IconButton, Box, Checkbox, Typography, Stack } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { useGetEntitiesByName } from '../../../../../hooks/entities/use-get-entities-by-name';
import { useFocusLocation } from '../../../../../hooks/map/use-focus-location';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import { mapActions, MapContext } from '../../../../../features/map/context';
import { ENTITIES } from '../../../../common';

export const SelectOrdersLabel = () => {
  const { watch } = useFormContext();
  const watchedOrders = watch('data.orders');

  const text = () => {
    switch (watchedOrders.length) {
      case 0:
        return null;
      case 1:
        return '1 order selected (Easy as pie)';
      default:
        return `${watchedOrders.length} orders selected`;
    }
  };

  return watchedOrders ? <span>{text()}</span> : null;
};

export const SelectOrdersStep = () => {
  const { control, getValues, formState } = useFormContext();
  const { errors }: { errors: any } = formState;
  const { dispatch } = useContext(MapContext);
  const { data: orders, isLoading, isFetching } = useGetEntitiesByName(ENTITIES.orders);
  const focusOrder = useFocusLocation();

  useEffect(() => {
    if (orders) {
      dispatch({ type: mapActions.UPDATE_STATE, payload: { orders: orders } });
    }

    return () => {
      const selectedOrders = getValues('data.orders');
      dispatch({ type: mapActions.UPDATE_STATE, payload: { orders: selectedOrders || [] } });
    };
  }, [orders]);

  return (
    <Controller
      name='data.orders'
      control={control}
      rules={{
        required: { value: true, message: 'Required' },
      }}
      render={({ field, fieldState, formState }) => (
        <Autocomplete
          {...field}
          {...fieldState}
          {...formState}
          multiple
          filterSelectedOptions
          disableCloseOnSelect
          groupBy={(option) => new Date(option.shippingDate as string).toDateString()}
          options={(orders || []).sort((a: any, b: any) => new Date(a.shippingDate).getTime() - new Date(b.shippingDate).getTime())}
          value={field.value || []}
          getOptionLabel={(option) => option._id}
          renderOption={(props, option, { selected }) => (
            <li {...props} style={{ justifyContent: 'space-between' }}>
              <Stack direction='row' justifyContent='center' alignItems='center'>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                  checkedIcon={<CheckBoxIcon fontSize='small' />}
                  style={{ marginRight: 8, display: 'inline' }}
                  checked={selected}
                />
                <Box>
                  {`ID: ${option._id}`}
                  <br />
                  <Typography sx={{ display: 'inline-block' }} component='span' variant='body2' color='text.primary'>
                    {`Address: ${option.address}`}
                  </Typography>
                  <br />
                  <Typography component='span' variant='caption' color='text.muted'>
                    {`Shipping date: ${new Date(option.shippingDate as string).toDateString()}`}
                  </Typography>
                </Box>
              </Stack>
              <IconButton
                edge='end'
                aria-label='comments'
                size='small'
                onClick={(e) => {
                  focusOrder(option);
                  e.stopPropagation();
                }}
              >
                <ZoomInMapIcon fontSize='inherit' />
              </IconButton>
            </li>
          )}
          onChange={(event, values) => {
            return field.onChange(values);
          }}
          loading={isLoading || isFetching}
          id='select-orders-autocomplete'
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label='Select Orders' error={!!errors?.data?.orders} />}
        />
      )}
    />
  );
};
