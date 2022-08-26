import { useState } from 'react';
import { Box, Stack, Switch, Typography } from '@mui/material';
import { useEaComponentDetails } from '../../../../../hooks/ea/use-ea-component-details';
import { EaComponentConfigBuilder } from './EaComponentConfig';
import { useFormContext } from 'react-hook-form';

type ComponentConfigTabProps = {
  componentType: string;
};

export const ComponentConfigTab = ({ componentType }: ComponentConfigTabProps) => {
  const [customComponentConfig, setCustomComponentConfig] = useState(false);
  // const { resetField } = useFormContext();
  const { data } = useEaComponentDetails(componentType);
  console.log('render ', componentType)
  
  // todo: handle switch tab bug
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomComponentConfig(event.target.checked);
    if (!event.target.checked) {
      // resetField(`config.${componentType}.name`);
    }
  };

  return (
    <Stack spacing={3}>
      <Stack direction='row' alignItems='center' sx={{ width: '100%', justifyContent: 'space-between' }}>
        <div>Enable custom {componentType}</div>
        <Switch checked={customComponentConfig} onChange={handleSwitchChange} />
      </Stack>

      <EaComponentConfigBuilder
        disabled={!customComponentConfig}
        componentType={componentType}
        componentDetails={data}
      />
    </Stack>
  );
};
