import * as React from 'react';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import Typography from '@mui/material/Typography';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', margin: 300 }}>
      <Typography variant='h1'>
        4<SentimentVeryDissatisfiedIcon sx={{ color: 'black', fontSize: 70 }} />4
      </Typography>
      <Typography variant='h2'>There's nothing here!</Typography>
    </div>
  );
};
