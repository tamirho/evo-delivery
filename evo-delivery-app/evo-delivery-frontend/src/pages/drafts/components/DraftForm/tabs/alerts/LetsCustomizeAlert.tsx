import { Alert, Box, Button } from '@mui/material';
import SettingsSuggestTwoToneIcon from '@mui/icons-material/SettingsSuggestTwoTone';

export type LetsCustomizeAlertProps = { onButtonClicked: () => void };

export const LetsCustomizeAlert = ({ onButtonClicked }: LetsCustomizeAlertProps) => (
  <Alert icon={<SettingsSuggestTwoToneIcon />} variant='outlined' severity='info' sx={{ p: 3, m: 3 }}>
    All set to go
    <br />
    In case you are brave enough, you can customize the algorithm steps yourself <br />
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20px' }}>
      <Button onClick={onButtonClicked} sx={{ mt: 1, mr: 1 }}>
        Let's customize!
      </Button>
    </Box>
  </Alert>
);
