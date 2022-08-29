import { TextField, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { convertObjToNiceText } from './common';

export const GeneralConfigLabel = () => {
  const { watch } = useFormContext();
  const watchedConfig = watch(['config.popSize', 'config.crossoverProb', 'config.mutateProb']);

  const text = () => {
    const [popSize, crossoverProb, mutateProb] = watchedConfig;

    return convertObjToNiceText({ popSize, crossoverProb, mutateProb });
  };

  return watchedConfig ? <span>{text()}</span> : null;
};

export const GeneralConfigStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack spacing={3} style={{ width: '100%' }}>
      <TextField
        id='input-popSize'
        label='Population Size'
        variant='standard'
        type='number'
        inputProps={{
          step: 5,
          max: 10000000,
          min: 0,
        }}
        {...register('config.popSize', { valueAsNumber: true, required: true })}
        // error={!!errors?.config?.['popSize']}
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
          required: true,
        })}
        // error={!!errors?.config?.['crossoverProb']}
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
        {...register('config.mutateProb', { valueAsNumber: true, required: true })}
        // error={!!errors?.config?.['mutateProb']}
      />
    </Stack>
  );
};
