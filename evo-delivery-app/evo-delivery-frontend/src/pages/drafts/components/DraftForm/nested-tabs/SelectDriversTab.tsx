import { TextField, Autocomplete, Checkbox, Box, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useGetEntitiesByName } from '../../../../../hooks/entities/use-get-entities-by-name';
import { ENTITIES } from '../../../../common';

export const SelectDriversTab = () => {
  const { control } = useFormContext();

  const { data: drivers, isLoading, isFetching } = useGetEntitiesByName(ENTITIES.drivers);

  return (
    <Controller
      name='data.drivers'
      control={control}
      render={({ field, fieldState, formState }) => (
        <Autocomplete
          {...field}
          {...fieldState}
          {...formState}
          multiple
          disableCloseOnSelect
          options={drivers || []}
          value={field.value || []}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                checkedIcon={<CheckBoxIcon fontSize='small' />}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              <Box>
                {`ID: ${option._id}`}
                <br />
                <Typography sx={{ display: 'inline' }} component='span' variant='body2' color='text.primary'>
                  {`Name: ${option.name}`}
                </Typography>
                <br />
                <Typography component='span' variant='caption' color='text.muted'>
                  {`Capacity: ${option.maxCapacity} | Distance: ${option.maxDistance}`}
                </Typography>
              </Box>
            </li>
          )}
          onChange={(event, values) => {
            return field.onChange(values);
          }}
          loading={isLoading || isFetching}
          id='select-drivers-autocomplete'
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label='Select Drivers' />}
        />
      )}
    />
  );
};
