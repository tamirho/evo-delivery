import React, { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { Map } from '../map/Map';
import { NavBar } from '../nav-bar/NavBar';
import { DetailsPanel } from '../details-panel/DetailsPanel';
import { SpeedActionButton } from '../speed-action-button/SpeedActionButton';
import { MapContextProvider } from '../map/context';
import { queryClient } from '../../clients';

import './App.css';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MapContextProvider>
        <SpeedActionButton />
        <NavBar />
        <Map />
        <DetailsPanel />
      </MapContextProvider>
    </QueryClientProvider>
  );
};

export default App;
