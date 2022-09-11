import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { EaResultInfo } from '@backend/types';
import { toString } from '../../../../utils/boolean.utils';
import { CircularProgress } from '@mui/material';

export type ResultEaInfoProps = {
  info: EaResultInfo;
  isDone: boolean;
  eaError?: boolean;
};

export const ResultEaInfo = ({ info, isDone, eaError }: ResultEaInfoProps) => {
  return (
    <Stack spacing={2} alignItems='center'>
      <Stack direction='row' spacing={2} marginTop={3}>
        <Chip label={`Fitness: ${info.fitness.toFixed(2)}`} icon={<AccessibilityNewOutlinedIcon />} variant='filled' />
        <Chip label={`Time: ${new Date(info.time).getTime()}`} icon={<AccessAlarmOutlinedIcon />} variant='filled' />
        <Chip label={`Generation: ${info.generation}`} icon={<AutoModeIcon />} variant='filled' />
      </Stack>
      <Stack direction='row' spacing={2} marginBottom={3}>
        <Chip
          label={`Status: ${isDone ? 'Done' : 'Running'}`}
          icon={isDone ? <DoneAllIcon /> : <CircularProgress size={20} />}
          variant='outlined'
        />
        <Chip label={`Errors: ${toString(!!eaError)}`} icon={<ErrorOutlineIcon />} variant='outlined' />
      </Stack>
    </Stack>
  );
};
