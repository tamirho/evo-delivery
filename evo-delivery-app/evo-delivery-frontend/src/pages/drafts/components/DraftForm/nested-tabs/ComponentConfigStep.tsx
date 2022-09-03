import { Stack, Switch } from '@mui/material';
import { useEaComponentDetails } from '../../../../../hooks/ea/use-ea-component-details';
import { EaComponentConfigBuilder } from './EaComponentConfigBuilder';
import { Controller, useFormContext } from 'react-hook-form';
import { toHumanReadableStr } from '../../../../../utils/string.utils';
import { convertObjToNiceText } from '../../common';

type ComponentConfigLabelProps = {
  componentType: string;
};

export const ComponentConfigLabel = ({ componentType }: ComponentConfigLabelProps) => {
  const { watch } = useFormContext();
  const watchedComponent = watch(`config.${componentType}`);

  const text = () => {
    const name = toHumanReadableStr(watchedComponent.name) || '';
    const args = convertObjToNiceText(watchedComponent.args);
    return `${name}${args ? ` {${args}}` : ''}`;
  };

  return watchedComponent ? <span>{text()}</span> : null;
};

type ComponentConfigStepProps = {
  componentType: string;
};

export const ComponentConfigStep = ({ componentType }: ComponentConfigStepProps) => {
  const { watch, control, clearErrors, resetField } = useFormContext();
  const { data } = useEaComponentDetails(componentType);
  const watchEnableSwitch = watch(`config.${componentType}.enabled`);

  return (
    <Stack spacing={3}>
      <Stack direction='row' alignItems='center' sx={{ width: '100%', justifyContent: 'space-between' }}>
        <div>Enable custom {componentType}</div>
        <Controller
          name={`config.${componentType}.enabled`}
          control={control}
          render={(props) => (
            <Switch
              onChange={(_, value) => {
                if (!value) {
                  clearErrors(`config.${componentType}`);
                  resetField(`config.${componentType}`);
                }
                props.field.onChange(value);
              }}
              checked={props.field.value}
            />
          )}
        />
      </Stack>

      <EaComponentConfigBuilder disabled={!watchEnableSwitch} componentType={componentType} componentDetails={data} />
    </Stack>
  );
};
