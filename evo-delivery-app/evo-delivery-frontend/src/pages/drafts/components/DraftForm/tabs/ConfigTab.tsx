import { Box, Divider, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { TabPanel } from './TabPanel';
import { a11yProps } from '../common';
import { GeneralConfigTab } from '../nested-tabs/GeneralConfigTab';
import { ComponentConfigTab } from '../nested-tabs/ComponentConfigTab';
// import { EaComponentTypes } from '@backend/types';
import { capitalize } from '../../../../../utils/string.utils';

export enum EaComponentTypes {
  SELECTION = 'selection',
  FITNESS = 'fitness',
  MUTATE = 'mutate',
  CROSSOVER = 'crossover',
}
export type ConfigTabProps = {};

export const ConfigTab = ({}: ConfigTabProps) => {
  const [nestedTabIndex, setNestedTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setNestedTabIndex(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={nestedTabIndex} onChange={handleTabChange} variant='scrollable' scrollButtons={true}>
          <Tab label='General' {...a11yProps(1, 0)} />
          {Object.values(EaComponentTypes).map((componentType, index) => (
            <Tab label={capitalize(componentType)} {...a11yProps(1, index + 1)} />
          ))}
          <Tab label='Stop Condition' {...a11yProps(1, 5)} />
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>
        <TabPanel value={nestedTabIndex} index={0}>
          <GeneralConfigTab />
        </TabPanel>
        {Object.values(EaComponentTypes).map((componentType, index) => (
          <TabPanel value={nestedTabIndex} index={index + 1}>
            <ComponentConfigTab componentType={componentType} />
          </TabPanel>
        ))}
        <TabPanel value={nestedTabIndex} index={5}>
          Select Stop Condition <br></br>
          Select Stop Condition <br></br>
          Select Stop Condition <br></br>
        </TabPanel>
      </Box>
    </>
  );
};
