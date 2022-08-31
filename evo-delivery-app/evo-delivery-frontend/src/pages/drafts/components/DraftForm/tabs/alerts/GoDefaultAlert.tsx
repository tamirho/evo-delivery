import { Alert, Box, Button } from '@mui/material';
import CelebrationTwoToneIcon from '@mui/icons-material/CelebrationTwoTone';

export type GoDefaultAlertProps = { disabled: boolean };

export const GoDefaultAlert = ({ disabled }: GoDefaultAlertProps) => (
  <Alert icon={<CelebrationTwoToneIcon />} variant='outlined' severity='info' sx={{ p: 3, m: 3 }}>
    Or you can always ride along as a co-pilot, create a draft with the default settings, and leave the rest to us!
    <br />
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20px' }}>
      <Button type='submit' disabled={disabled} sx={{ mt: 1, mr: 1 }}>
        Yes, yes, yes!
      </Button>
    </Box>
  </Alert>
);
