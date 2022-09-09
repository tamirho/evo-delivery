import { Button, Stack, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { Driver } from '@backend/types/driver.type';
import { useForm } from 'react-hook-form';
import { ENTITY_VIEW_STATES, FormStates } from '../../../common';
import { useNavigateToEntityViewState } from '../../../../hooks/router/use-navigate-to-view-state';

export type DriverFormProps = {
  state: FormStates;
  onSubmit?: (data: any, event?: React.BaseSyntheticEvent) => any | Promise<any>;
  driver?: Driver;
};

export const DriverForm = ({ state, onSubmit = (data) => console.log(data), driver }: DriverFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: driver || ({} as Driver) });

  return (
    <Stack component='form' onSubmit={handleSubmit(onSubmit)} spacing={3} style={{ width: '100%', margin: 20 }}>
      {state !== ENTITY_VIEW_STATES.create ? (
        <TextField
          style={{ marginLeft: '5%', marginRight: '10%', marginTop: '5%' }}
          id='outlined-error'
          label='ID'
          InputProps={{
            readOnly: true,
          }}
          disabled={true}
          variant='standard'
          {...register('_id')}
        />
      ) : null}

      <TextField
        style={{ marginLeft: '5%', marginRight: '10%', marginTop: '5%' }}
        id='filled-number'
        label='Name'
        InputProps={{
          readOnly: state === ENTITY_VIEW_STATES.view,
        }}
        variant='standard'
        {...register('name', { required: true })}
        error={errors.name ? true : false}
        helperText={errors.name ? 'Driver name required' : ''}
      />
      <TextField
        style={{ marginLeft: '5%', marginRight: '10%', marginTop: '5%' }}
        id='filled-number'
        label='Max Capacity (KGs)'
        type='number'
        InputProps={{
          readOnly: state === ENTITY_VIEW_STATES.view,
        }}
        variant='standard'
        {...register('maxCapacity', { required: true, min: 1 })}
        error={errors.maxCapacity ? true : false}
        helperText={errors.maxCapacity ? 'Driver max capacity must be larger than zero' : ''}
      />
      <TextField
        style={{ marginLeft: '5%', marginRight: '10%', marginTop: '5%' }}
        id='filled-number'
        label='Max Distance (KMs)'
        type='number'
        InputProps={{
          readOnly: state === ENTITY_VIEW_STATES.view,
        }}
        variant='standard'
        {...register('maxDistance', { required: true, min: 1 })}
        error={errors.maxCapacity ? true : false}
        helperText={errors.maxCapacity ? 'Driver max distance must be larger than zero' : ''}
      />
      {state !== ENTITY_VIEW_STATES.view ? (
        <Button
          type='submit'
          variant='contained'
          color='info'
          style={{
            width: '85%',
            borderRadius: 50,
            marginLeft: '5%',
            marginRight: '10%',
            marginTop: '5%',
          }}
          startIcon={state === ENTITY_VIEW_STATES.edit ? <SaveIcon /> : <AddIcon />}
        >
          {state === ENTITY_VIEW_STATES.edit ? 'Save' : 'Create'}
        </Button>
      ) : (
        <Button
          type='submit'
          variant='contained'
          color='info'
          style={{
            width: '85%',
            borderRadius: 50,
            marginLeft: '5%',
            marginRight: '10%',
            marginTop: '5%',
          }}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      )}
    </Stack>
  );
};
