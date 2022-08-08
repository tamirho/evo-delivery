import React from 'react';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import FolderTwoToneIcon from '@mui/icons-material/FolderTwoTone';
import NoteAddTwoToneIcon from '@mui/icons-material/NoteAddTwoTone';
import WidgetsTwoToneIcon from '@mui/icons-material/WidgetsTwoTone';
import RocketLaunchTwoToneIcon from '@mui/icons-material/RocketLaunchTwoTone';
import GiteTwoToneIcon from '@mui/icons-material/GiteTwoTone';
import { ENTITY_VIEW_STATES, PANEL_STATES, ROUTES, SEARCH_PARAMS } from '../../pages';

export const NAV_BAR_WIDTH = 60;

export const navBarTabs = [
  {
    name: 'Home',
    description: undefined,
    icon: <HomeTwoToneIcon />,
    to: {
      route: ROUTES.home,
    },
  },
  {
    name: 'Drafts',
    description: undefined,
    icon: <FolderTwoToneIcon />,
    to: {
      route: ROUTES.drafts,
      params: { [SEARCH_PARAMS.panel]: PANEL_STATES.open },
    },
  },
  {
    name: 'Divider',
  },
  {
    name: 'Drivers',
    description: undefined,
    icon: <LocalShippingTwoToneIcon />,
    to: {
      route: ROUTES.drivers,
      params: { [SEARCH_PARAMS.panel]: PANEL_STATES.open },
    },
  },
  {
    name: 'Orders',
    description: undefined,
    icon: <WidgetsTwoToneIcon />,
    to: {
      route: ROUTES.orders,
      params: { [SEARCH_PARAMS.panel]: PANEL_STATES.open },
    },
  },
  {
    name: 'Depots',
    description: undefined,
    icon: <GiteTwoToneIcon />,
    to: {
      route: ROUTES.depots,
      params: { [SEARCH_PARAMS.panel]: PANEL_STATES.open },
    },
  },
  {
    name: 'Divider',
  },
  {
    name: 'New Draft',
    description: undefined,
    icon: <NoteAddTwoToneIcon />,
    to: {
      route: `${ROUTES.drafts}/${ENTITY_VIEW_STATES.create}`,
      params: { [SEARCH_PARAMS.panel]: PANEL_STATES.open },
    },
  },
  {
    name: 'Results',
    description: undefined,
    icon: <RocketLaunchTwoToneIcon />,
    to: {
      route: ROUTES.results,
      params: { [SEARCH_PARAMS.panel]: PANEL_STATES.open },
    },
  },
];
