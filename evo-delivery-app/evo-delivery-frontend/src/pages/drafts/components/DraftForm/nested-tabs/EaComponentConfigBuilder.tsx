import { EaComponentDetails, EaComponentKwargs } from '@backend/types';
import { TextField, Stack, Autocomplete, Box, Typography, IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Controller, useFormContext } from 'react-hook-form';
import { capitalize, toHumanReadableStr } from '../../../../../utils/string.utils';

const isLink = (wannabeLink: string) => wannabeLink.startsWith('http');
const isInt = (type: string) => type === 'int';
const isFloat = (type: string) => type === 'float';
const isNumber = (type: string) => isFloat(type) || isInt(type);
const isProbability = (name: string) => name === 'indpb';

type EaComponentConfigBuilderProps = {
  componentType: string;
  componentDetails: { types: EaComponentDetails[] } | undefined;
  disabled: boolean;
};

export const EaComponentConfigBuilder = ({
  componentType,
  componentDetails,
  disabled,
}: EaComponentConfigBuilderProps) => {
  const {
    register,
    control,
    watch,
    clearErrors,
    resetField,
    formState: { errors },
  } = useFormContext();
  const watchComponentName = watch(`config.${componentType}.name`);
  return (
    <Stack spacing={3} style={{ width: '100%' }}>
      <Controller
        name={`config.${componentType}.name`}
        control={control}
        rules={{
          required: { value: !disabled, message: 'Required' },
          validate: (option) => option?.name,
        }}
        render={({ field, fieldState, formState }) => (
          <Autocomplete
            disabled={disabled}
            {...field}
            {...fieldState}
            {...formState}
            options={componentDetails?.types || []}
            value={componentDetails?.types.find(({ name }) => name === field.value) || null}
            getOptionLabel={(option) => capitalize(toHumanReadableStr(option.name))}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            renderOption={(props, option, { selected }) => (
              <li
                {...props}
                id={`autocomplete-${componentType}-option-${option.name}`}
                style={{ justifyContent: 'space-between' }}
              >
                <Box>
                  {capitalize(toHumanReadableStr(option.name))}
                  {option.kwargs.length > 0 ? (
                    <>
                      <br />
                      <Typography component='span' variant='body2' color='text.muted'>
                        {`keyword arguments: [${option.kwargs.map((arg: EaComponentKwargs) => arg.name).join(', ')}]`}
                      </Typography>
                    </>
                  ) : null}
                </Box>
                <Tooltip title={isLink(option.description) ? 'Link To Description' : option.description}>
                  <IconButton
                    edge='end'
                    aria-label='comments'
                    size='small'
                    onClick={(e) => {
                      if (isLink(option.description)) {
                        window.open(option.description);
                      }
                      e.stopPropagation();
                    }}
                  >
                    <InfoIcon fontSize='inherit' />
                  </IconButton>
                </Tooltip>
              </li>
            )}
            onChange={(event, value) => {
              clearErrors(`config.${componentType}`);
              return field.onChange(value?.name);
            }}
            id={`select-component-${componentType}-config-autocomplete`}
            sx={{ width: '100%' }}
            renderInput={(params) => (
              <TextField
                {...params}
                id={`select-component-${componentType}-textfield`}
                label={`Select ${capitalize(toHumanReadableStr(componentType))} Type`}
                // error={!!errors?.config?.[componentType]?.['name']}
              />
            )}
          />
        )}
      />

      {watchComponentName &&
        componentDetails?.types
          .find((component) => component.name === watchComponentName)
          ?.kwargs?.map(({ name, description, type }, i) => (
            <TextField
              id={`input-${watchComponentName}-${name}-${i}`}
              // error={!!errors?.config?.[componentType]?.['args']?.[name]}
              disabled={disabled}
              label={capitalize(toHumanReadableStr(name))}
              variant='outlined'
              type='number'
              inputProps={{
                min: 0,
                ...(isFloat(type) ? { step: 0.01 } : {}),
                ...(isProbability(name) ? { max: 1 } : {}),
              }}
              {...register(`config.${componentType}.args.${name}`, {
                valueAsNumber: isNumber(type),
                required: { value: !disabled, message: 'Required' },
                validate: (number) => !isNaN(number) || 'Must be a number',
                min: { value: 0, message: 'Min Value is 0' },
              })}
              helperText={description}
            />
          ))}
    </Stack>
  );
};
