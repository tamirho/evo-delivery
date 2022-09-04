import { EaEvaluateConfig } from '@backend/types';
import { Typography, ListItemText, Divider, ListItem, List, ListItemIcon } from '@mui/material';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { convertObjToNiceText } from '../../common';
import { capitalize, toHumanReadableStr } from '../../../../../utils/string.utils';

export type ShowDraftConfigProps = {
  config: EaEvaluateConfig;
  isLoading: boolean;
  isError: boolean;
};

export const ShowDraftConfig = ({ config }: ShowDraftConfigProps) => {
  return (
    <List style={{ width: '100%', margin: 10 }} dense={true}>
      {Object.entries(config).map(([componentName, configItem]) => {
        return configItem ? (
          <div key={`div_${componentName}`}>
            <ListItem key={componentName} disablePadding alignItems='center'>
              <ListItemIcon>
                <ArrowRightIcon />
              </ListItemIcon>
              <ListItemText
                primary={capitalize(toHumanReadableStr(componentName))}
                secondary={
                  configItem !== null && typeof configItem === 'object' ? (
                    <>
                      <Typography component='span' variant='body2'>
                        {`Name: ${capitalize(toHumanReadableStr(configItem.name))}`}
                      </Typography>
                      <br />
                      {configItem.args && Object.keys(configItem.args).length ? (
                        <Typography component='span' variant='body2'>
                          {`args: {${convertObjToNiceText(configItem.args)}}`}
                        </Typography>
                      ) : null}
                    </>
                  ) : (
                    configItem
                  )
                }
              />
            </ListItem>
            <Divider key={`divider_${componentName}`} variant='middle' component='li' />
          </div>
        ) : null;
      })}
    </List>
  );
};
