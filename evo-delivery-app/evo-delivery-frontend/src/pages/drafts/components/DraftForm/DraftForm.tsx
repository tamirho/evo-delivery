import { useContext, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Badge, Box, Button, Tab, Tabs } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ClearIcon from '@mui/icons-material/Clear';

import { Draft, EnrichedDraft } from '@backend/types/';
import { DataTab } from './tabs/DataTab';
import { TabPanel } from './tabs/TabPanel';
import { ConfigTab } from './tabs/ConfigTab';
import { a11yProps, countErrors, createDefaultDraft, transformToDraft } from './common';
import { FormStates } from '../../../common';
import { mapActions, MapContext } from '../../../../features/map/context';

export type DraftFormProps = {
  state: FormStates;
  onSubmit?: (data: any, event?: React.BaseSyntheticEvent) => any | Promise<any>;
  draft?: EnrichedDraft;
};

export const DraftForm = ({ state, onSubmit = (data) => console.log(data), draft }: DraftFormProps) => {
  const defaultDraft = useMemo(() => createDefaultDraft(draft), [draft]);
  const { dispatch } = useContext(MapContext);
  const methods = useForm({ defaultValues: defaultDraft, mode: 'onBlur' });

  const [tabIndex, setTabIndex] = useState(0);
  const [dataTabActiveStep, setDataTabActiveStep] = useState(0);
  const [configTabActiveStep, setConfigTabActiveStep] = useState(0);

  useEffect(() => {
    return () => {
      dispatch({
        type: mapActions.CLEAR_STATE,
        payload: {},
      });
    };
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const transformAndSubmit = (data: any) => {
    const t = transformToDraft(data);
    onSubmit(t);
  };

  const errorCount = countErrors(methods.formState.errors);

  return (
    <FormProvider {...methods}>
      <Box sx={{ width: '100vw', height: '100vh' }}>
        <form onSubmit={methods.handleSubmit(transformAndSubmit)}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabIndex} onChange={handleTabChange} centered>
              <Tab
                label='Plan Data'
                icon={
                  <Badge color='error' badgeContent={errorCount.data}>
                    <NewspaperIcon />
                  </Badge>
                }
                iconPosition='start'
                {...a11yProps(0, 0)}
              />

              <Tab
                label='Configuration'
                icon={
                  <Badge color='error' badgeContent={errorCount.config}>
                    <SettingsSuggestIcon />
                  </Badge>
                }
                iconPosition='start'
                {...a11yProps(0, 1)}
              />
            </Tabs>
          </Box>

          <TabPanel value={tabIndex} index={0}>
            <DataTab
              activeStep={dataTabActiveStep}
              setActiveStep={setDataTabActiveStep}
              letsCustomizeOnClickHandler={() => setTabIndex(1)}
            />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <ConfigTab activeStep={configTabActiveStep} setActiveStep={setConfigTabActiveStep} />
          </TabPanel>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20px' }}>
            <Box sx={{ position: 'absolute', bottom: '20px' }}>
              <Button
                variant='contained'
                color='error'
                style={{ borderRadius: 50, marginRight: 4 }}
                startIcon={<ClearIcon />}
                onClick={() => methods.reset()}
              >
                Reset
              </Button>
              <Button
                type='submit'
                disabled={!!errorCount.all}
                variant='contained'
                color='info'
                style={{ borderRadius: 50 }}
                startIcon={<AddIcon />}
              >
                Create Draft
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </FormProvider>
  );
};
