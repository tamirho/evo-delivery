import React, { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { Map } from '../map/Map';
import { NavBar } from '../nav-bar/NavBar';
import { DetailsPanel } from '../details-panel/DetailsPanel';
import { MapContextProvider } from '../map/context';
import { queryClient } from '../../clients';

import './App.css';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MapContextProvider>
        <NavBar />
        <Map />
        <DetailsPanel />
      </MapContextProvider>
    </QueryClientProvider>
  );
};

export default App;
