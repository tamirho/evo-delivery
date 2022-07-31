import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import { createSearchParams, useLocation } from 'react-router-dom';

import { ListItemLink } from './ListItemLink';

export type NavBarListProps = {
  tabs?: {
    name?: string;
    description?: string;
    icon?: JSX.Element;
    to?: { route?: string; params?: { [key: string]: string } };
  }[];
};

export const NavBarList = ({ tabs }: NavBarListProps) => {
  const routeLocation = useLocation();
  return (
    <List>
      {tabs?.map(({ name, icon, to }, index) => {
        switch (name) {
          case 'Divider':
            return <Divider key={`divider_${index}`} />;
          default:
            const searchParams = createSearchParams(to?.params);
            const urlTo = `${to ? to.route : ''}${searchParams ? `?${searchParams}` : ''}`;
            return (
              <ListItemLink key={name} to={urlTo}>
                <Tooltip title={name || ''} placement='right' arrow>
                  <ListItemButton selected={to?.route === routeLocation.pathname}>
                    <ListItemIcon>{icon}</ListItemIcon>
                  </ListItemButton>
                </Tooltip>
              </ListItemLink>
            );
        }
      })}
    </List>
  );
};
