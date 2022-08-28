import { Alert } from '@mui/material';
import RocketLaunchTwoToneIcon from '@mui/icons-material/RocketLaunchTwoTone';

export const WellDoneAlert = () => (
  <Alert icon={<RocketLaunchTwoToneIcon />} variant='outlined' severity='success' sx={{ p: 3, m: 3 }}>
    Well Done!
    <br />
    This is going to be a blast
  </Alert>
);
