export const ENTITIES = {
  orders: 'orders',
  drivers: 'drivers',
  drafts: 'drafts',
  depots: 'depots',
  results: 'results',
};

export const ROUTES = {
  home: '/',
  orders: '/orders',
  drivers: '/drivers',
  drafts: '/drafts',
  depots: '/depots',
  results: '/results',
};

export const SEARCH_PARAMS = {
  panel: 'panel',
};

export const ENTITY_VIEW_STATES = {
  list: 'list',
  view: 'view',
  create: 'create',
  edit: 'edit',
  delete: 'delete',
  clone: 'clone',
} as const;

export const PANEL_STATES = {
  open: 'open',
  close: 'close',
};

type ViewStateKeys = keyof typeof ENTITY_VIEW_STATES;
export type ViewStates = typeof ENTITY_VIEW_STATES[ViewStateKeys];
export type FormStates = Omit<ViewStates, 'list' | 'delete'>;