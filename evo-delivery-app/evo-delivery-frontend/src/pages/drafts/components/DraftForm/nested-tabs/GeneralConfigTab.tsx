import { TextField, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';

export const GeneralConfigTab = () => {
  const { register } = useFormContext();

  return (
    <Stack spacing={3} style={{ width: '100%' }}>
      <TextField
        id='input-popSize'
        label='Population Size'
        variant='standard'
        type='number'
        inputProps={{
          step: 5,
          max: 100000,
          min: 0,
        }}
        {...register('config.popSize', { valueAsNumber: true })}
      />
      <TextField
        id='input-crossoverProb'
        label='Crossover Probability'
        variant='standard'
        type='number'
        inputProps={{
          step: 0.01,
          max: 1,
          min: 0,
        }}
        {...register('config.crossoverProb', {
          valueAsNumber: true,
        })}
      />
      <TextField
        id='input-mutateProb'
        label='Mutate Probability'
        variant='standard'
        type='number'
        inputProps={{
          step: 0.01,
          max: 1,
          min: 0,
        }}
        {...register('config.mutateProb', { valueAsNumber: true })}
      />
    </Stack>
  );
};
