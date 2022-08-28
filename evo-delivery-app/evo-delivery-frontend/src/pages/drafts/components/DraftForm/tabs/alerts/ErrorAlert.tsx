import { Alert } from '@mui/material';
import ReportProblemTwoToneIcon from '@mui/icons-material/ReportProblemTwoTone';

export const ErrorAlert = () => (
  <Alert icon={<ReportProblemTwoToneIcon />} variant='outlined' severity='error' sx={{ p: 3, m: 3 }}>
    Oh no!
    <br />
    It appears that you have some errors there,
    <br />
    please check it again
  </Alert>
);
