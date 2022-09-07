import React from 'react';
import StorageIcon from '@mui/icons-material/Storage';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import WidgetsIcon from '@mui/icons-material/Widgets';
import GiteIcon from '@mui/icons-material/Gite';
import GitHubIcon from '@mui/icons-material/GitHub';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import { ENTITY_VIEW_STATES, PANEL_STATES, ROUTES, SEARCH_PARAMS } from '../../pages';

export const speedActionOptions = [
  {
    name: 'Seed DB',
    icon: <StorageIcon />,
    onClick: async () => {
      if (
        window.confirm(
          `This action will drop all DB data and initialize it with random data.\nAre you sure you want to perform this action?`
        )
      ) {
        await fetch(`/api/v1/seed`);
        alert('DB seeded!');
      }
    },
    to: {
      route: ROUTES.home,
    },
  },
  {
    name: 'Github',
    icon: <GitHubIcon />,
    onClick: async () => {
      window.open('https://github.com/tamirho/evo-delivery', '_blank');
    },
    to: {
      route: ROUTES.home,
    },
  },
  {
    name: 'Evolutionary algorithm definition',
    icon: <QuestionMarkIcon />,
    onClick: async () => {
      window.open('https://en.wikipedia.org/wiki/Evolutionary_algorithm', '_blank');
    },
    to: {
      route: ROUTES.home,
    },
  },
  // {
  //   name: 'New Draft',
  //   icon: <NoteAddIcon />,
  //   to: {
  //     route: `${ROUTES.drafts}/${ENTITY_VIEW_STATES.create}`,
  //     params: { [SEARCH_PARAMS.panel]: PANEL_STATES.open },
  //   },
  // },
  // {
  //   name: 'New Depot',
  //   icon: <GiteIcon />,
  //   to: {
  //     route: `${ROUTES.depots}/${ENTITY_VIEW_STATES.create}`,
  //     params: { [SEARCH_PARAMS.panel]: PANEL_STATES.open },
  //   },
  // },
  // {
  //   name: 'New Order',
  //   icon: <WidgetsIcon />,
  //   to: {
  //     route: `${ROUTES.orders}/${ENTITY_VIEW_STATES.create}`,
  //     params: { [SEARCH_PARAMS.panel]: PANEL_STATES.open },
  //   },
  // },
  // {
  //   name: 'New Driver',
  //   icon: <LocalShippingIcon />,
  //   to: {
  //     route: `${ROUTES.drivers}/${ENTITY_VIEW_STATES.create}`,
  //     params: { [SEARCH_PARAMS.panel]: PANEL_STATES.open },
  //   },
  // },
];
