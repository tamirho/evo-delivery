import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import { NavBarList } from './NavBarList';
import { navBarTabs, NAV_BAR_WIDTH } from './constants';
import { Divider } from '@mui/material';

type NavBarProps = {};

export const NavBar = (props: NavBarProps) => {
  return (
    <Drawer
      PaperProps={{ square: false }}
      sx={{
        width: NAV_BAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: NAV_BAR_WIDTH,
          boxSizing: 'border-box',
        },
      }}
      variant='permanent'
      anchor='left'
    >
      <Toolbar />
      <Divider />
      <NavBarList tabs={navBarTabs} />
    </Drawer>
  );
};
