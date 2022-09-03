import { EaEvaluateConfig } from '@backend/types';
import { DraftFormValues } from './types';


export const createDefaultDraft = (): DraftFormValues => ({
  data: { drivers: [], orders: [], depot: null },
  config: {
    popSize: 100,
    crossoverProb: 0.5,
    mutateProb: 0.5,
    crossover: { enabled: false, name: '', args: {} },
    fitness: { enabled: false, name: '', args: {} },
    selection: { enabled: false, name: '', args: {} },
    mutate: { enabled: false, name: '', args: {} },
    stopCondition: { enabled: false, name: '', args: {} },
  },
});

export const toIdsList = (list: { _id: string }[]) => {
  return list?.map((item) => item?._id);
};

export const isComponentEmpty = (componentConfig: { enabled?: false; name: string; args: {} } | undefined) =>
  !componentConfig || !componentConfig.enabled || componentConfig.name === '';

export const extractComponentConfig = ({ name, args }: { enabled?: false; name: string; args: {} }) => ({ name, args });

export const removeEmptyComponents = ({ popSize, crossoverProb, mutateProb, ...config }: EaEvaluateConfig) => ({
  popSize,
  crossoverProb,
  mutateProb,
  ...(isComponentEmpty(config.crossover) ? {} : { crossover: extractComponentConfig(config.crossover!) }),
  ...(isComponentEmpty(config.fitness) ? {} : { fitness: extractComponentConfig(config.fitness!) }),
  ...(isComponentEmpty(config.selection) ? {} : { selection: extractComponentConfig(config.selection!) }),
  ...(isComponentEmpty(config.mutate) ? {} : { mutate: extractComponentConfig(config.mutate!) }),
  ...(isComponentEmpty(config.stopCondition) ? {} : { stopCondition: extractComponentConfig(config.stopCondition!) }),
});

export const transformToDraft = (formData: any) => ({
  data: {
    drivers: toIdsList(formData.data.drivers),
    orders: toIdsList(formData.data.orders),
    depot: formData.data.depot?._id || null ,
  },
  config: removeEmptyComponents(formData.config),
});

export const a11yProps = (level: number, index: number) => {
  return {
    id: `simple-tab-${level}-${index}`,
    'aria-controls': `simple-tabpanel-${level}-${index}`,
  };
};

export const countErrors = (errors: any) => {
  const data = Object.keys(errors.data || {}).length;
  const config = Object.keys(errors.config || {}).length;
  const all = data + config;

  return { data, config, all };
};
