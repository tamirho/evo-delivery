import { EnrichedDraft, EaEvaluateConfig, EaComponentConfig } from '@backend/types';
import { DraftFormValues } from './types';

const adaptEaComponent = (componentConfig: EaComponentConfig | undefined) => ({
  enabled: !!componentConfig,
  name: '',
  args: {},
  ...componentConfig,
});

export const createDefaultDraft = (draft: EnrichedDraft | undefined): DraftFormValues => ({
  data: {
    drivers: draft?.data?.drivers || [],
    orders: draft?.data?.orders || [],
    depot: draft?.data?.depot || null,
  },
  config: {
    popSize: draft?.config?.popSize || 100,
    crossoverProb: draft?.config?.crossoverProb || 0.5,
    mutateProb: draft?.config?.mutateProb || 0.5,
    crossover: adaptEaComponent(draft?.config?.crossover),
    fitness: adaptEaComponent(draft?.config?.fitness),
    selection: adaptEaComponent(draft?.config?.selection),
    mutate: adaptEaComponent(draft?.config?.mutate),
    stopCondition: adaptEaComponent(draft?.config?.stopCondition),
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
    depot: formData.data.depot?._id || null,
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
