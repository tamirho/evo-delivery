import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Stack, TextField } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

import { Order } from '@backend/types';
import { ENTITY_VIEW_STATES, FormStates } from '../../../common';
import { useNavigateToEntityViewState } from '../../../../hooks/router/use-navigate-to-edit';

export type OrderFormProps = {
  state: FormStates;
  onSubmit?: (data: any, event?: React.BaseSyntheticEvent) => any | Promise<any>;
  order?: Order;
};

export const OrderForm = ({ state, onSubmit = (data) => console.log(data), order }: OrderFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: order || ({} as Order) });

  const navigateToState = useNavigateToEntityViewState();

  return (
    <Stack component='form' onSubmit={handleSubmit(onSubmit)} spacing={3} style={{ width: '100%', margin: 20 }}>
      {state !== ENTITY_VIEW_STATES.create ? (
        <TextField
          fullWidth
          id='order-id'
          label='ID'
          InputProps={{
            readOnly: true,
          }}
          variant='standard'
          {...register('_id')}
        />
      ) : null}

      <TextField
        fullWidth
        id='order-address'
        label='Address'
        InputProps={{
          readOnly: state === ENTITY_VIEW_STATES.view,
        }}
        variant='standard'
        {...register('address')}
      />

      <>
        <TextField
          id='order-latitude'
          label='Latitude'
          InputProps={{
            readOnly: state === ENTITY_VIEW_STATES.view,
          }}
          variant='standard'
          type='number'
          {...register('latitude')}
        />

        <TextField
          id='order-longitude'
          label='Longitude'
          InputProps={{
            readOnly: state === ENTITY_VIEW_STATES.view,
          }}
          variant='standard'
          type='number'
          {...register('longitude')}
        />
      </>
      <TextField
        fullWidth
        id='order-weight'
        label='Weight'
        InputProps={{
          readOnly: state === ENTITY_VIEW_STATES.view,
        }}
        variant='standard'
        type='number'
        {...register('weight')}
      />

      <TextField
        fullWidth
        id='order-shippingDate'
        label='Shipping Date'
        InputProps={{
          readOnly: state === ENTITY_VIEW_STATES.view,
        }}
        variant='standard'
        type='date'
        defaultValue={''}
        {...register('shippingDate')}
      />

      {state !== ENTITY_VIEW_STATES.create ? (
        <TextField
          fullWidth
          id='order-createdAt'
          label='Created At'
          InputProps={{
            readOnly: true,
          }}
          variant='standard'
          type='date'
          {...register('createdAt')}
        />
      ) : null}

      {state !== ENTITY_VIEW_STATES.create ? (
        <TextField
          fullWidth
          id='order-updatedAt'
          label='Updated At'
          InputProps={{
            readOnly: true,
          }}
          variant='standard'
          type='date'
          {...register('updatedAt')}
        />
      ) : null}

      {state !== ENTITY_VIEW_STATES.view ? (
        <Button
          //   type='submit'
          variant='contained'
          color='info'
          style={{ borderRadius: 50 }}
          startIcon={state === ENTITY_VIEW_STATES.edit ? <SaveIcon /> : <AddIcon />}
        >
          {state === ENTITY_VIEW_STATES.edit ? 'Save' : 'Create'}
        </Button>
      ) : (
        <Button
          variant='contained'
          color='info'
          style={{ borderRadius: 50 }}
          startIcon={<EditIcon />}
          onClick={() => navigateToState(ENTITY_VIEW_STATES.edit)}
        >
          Edit
        </Button>
      )}
    </Stack>
  );
};
