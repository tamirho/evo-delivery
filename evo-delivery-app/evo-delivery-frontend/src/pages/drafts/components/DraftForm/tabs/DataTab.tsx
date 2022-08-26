import { Box, Divider, Tab, Tabs } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { TabPanel } from './TabPanel';
import { SelectDepotTab } from '../nested-tabs/SelectDepotTab';
import { a11yProps } from '../common';
import { SelectDriversTab } from '../nested-tabs/SelectDriversTab';
import { SelectOrdersTab } from '../nested-tabs/SelectOrdersTab';

export type DataTabProps = {};

export const DataTab = ({}: DataTabProps) => {
  const [nestedTabIndex, setNestedTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setNestedTabIndex(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={nestedTabIndex} onChange={handleTabChange} variant='scrollable' scrollButtons={true}>
          <Tab label='Depot' {...a11yProps(1, 0)} />
          <Tab label='Drivers' {...a11yProps(1, 1)} />
          <Tab label='Orders' {...a11yProps(1, 2)} />
        </Tabs>
      </Box>

      <Box sx={{ p: 3 }}>
        <TabPanel value={nestedTabIndex} index={0}>
          <SelectDepotTab />
        </TabPanel>
        <TabPanel value={nestedTabIndex} index={1}>
          <SelectDriversTab />
        </TabPanel>
        <TabPanel value={nestedTabIndex} index={2}>
          <SelectOrdersTab />
        </TabPanel>
      </Box>
    </>
  );
};
