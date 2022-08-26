import { Box, Button, Tab, Tabs } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Draft, EaComponentConfig, EaEvaluateConfig } from '@backend/types/';
import { FormProvider, useForm } from 'react-hook-form';
import { FormStates } from '../../../common';
import { useState } from 'react';
import { DataTab } from './tabs/DataTab';
import { TabPanel } from './tabs/TabPanel';
import { ConfigTab } from './tabs/ConfigTab';
import { a11yProps } from './common';

const createDefaultDraft = () => ({
  data: { drivers: [], orders: [], depot: null },
  config: {
    popSize: 100,
    crossoverProb: 0.5,
    mutateProb: 0.5,
    numGenerations: 1000,
    crossover: { name: '', args: {} },
    fitness: { name: '', args: {} },
    selection: { name: '', args: {} },
    mutate: { name: '', args: {} },
  },
});

export type DraftFormProps = {
  state: FormStates;
  onSubmit?: (data: any, event?: React.BaseSyntheticEvent) => any | Promise<any>;
  draft?: Draft;
};

const toIdsList = (list: { _id: string }[]) => {
  console.log(list);
  return list?.map((item) => item?._id);
};
const isComponentEmpty = (componentConfig: EaComponentConfig | undefined) =>
  !componentConfig || componentConfig.name === '';
const removeEmptyComponents = ({
  popSize,
  crossoverProb,
  mutateProb,
  numGenerations,
  ...config
}: EaEvaluateConfig) => ({
  popSize,
  crossoverProb,
  mutateProb,
  numGenerations,
  ...(isComponentEmpty(config.crossover) ? {} : { crossover: config.crossover }),
  ...(isComponentEmpty(config.fitness) ? {} : { fitness: config.fitness }),
  ...(isComponentEmpty(config.selection) ? {} : { selection: config.selection }),
  ...(isComponentEmpty(config.mutate) ? {} : { mutate: config.mutate }),
});

const transformToDraft = (formData: any) => ({
  data: {
    drivers: toIdsList(formData.drivers),
    orders: toIdsList(formData.orders),
    depot: formData.depot._id,
  },
  config: removeEmptyComponents(formData.config),
});

export const DraftForm = ({ state, onSubmit = (data) => console.log(data), draft }: DraftFormProps) => {
  const defaultDraft = createDefaultDraft();
  const methods = useForm({ defaultValues: defaultDraft });

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const transformAndSubmit = (data: any) => {
    console.log(data);
    const t = transformToDraft(data);
    onSubmit(t);
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ width: '100%' }}>
        <form onSubmit={methods.handleSubmit(transformAndSubmit)}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabIndex} onChange={handleTabChange}>
              <Tab label='Data' {...a11yProps(0, 0)} />
              <Tab label='Configuration' {...a11yProps(0, 1)} />
            </Tabs>
          </Box>

          <TabPanel value={tabIndex} index={0}>
            <DataTab />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <ConfigTab />
          </TabPanel>

          <Button type='submit' variant='contained' color='info' style={{ borderRadius: 50 }} startIcon={<AddIcon />}>
            Create
          </Button>
        </form>
      </Box>
    </FormProvider>
  );
};
