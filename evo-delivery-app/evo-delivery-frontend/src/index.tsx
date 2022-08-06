import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import App from './features/app/App';
import {
  Drafts,
  Drivers,
  Orders,
  Depots,
  Depot,
  Draft,
  Driver,
  Order,
  EditOrder,
  CreateDepot,
  CreateDraft,
  CreateDriver,
  CreateOrder,
  EditDepot,
  EditDraft,
  EditDriver,
  NotFound,
  Run,
  Runs,
  ENTITY_VIEW_STATES,
  ENTITIES,
} from './pages';

import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path={`/`} element={<App />}>
          <Route path={ENTITIES.orders}>
            <Route index element={<Orders />} />
            <Route path={`${ENTITY_VIEW_STATES.create}`} element={<CreateOrder />} />
            <Route path={`:orderId/${ENTITY_VIEW_STATES.view}`} element={<Order />} />
            <Route path={`:orderId/${ENTITY_VIEW_STATES.edit}`} element={<EditOrder />} />
          </Route>
          <Route path={ENTITIES.drivers}>
            <Route index element={<Drivers />} />
            <Route path={`${ENTITY_VIEW_STATES.create}`} element={<CreateDriver />} />
            <Route path={`:driverId/${ENTITY_VIEW_STATES.view}`} element={<Driver />} />
            <Route path={`:driverId/${ENTITY_VIEW_STATES.edit}`} element={<EditDriver />} />
          </Route>
          <Route path={ENTITIES.depots}>
            <Route index element={<Depots />} />
            <Route path={`${ENTITY_VIEW_STATES.create}`} element={<CreateDepot />} />
            <Route path={`:depotId/${ENTITY_VIEW_STATES.view}`} element={<Depot />} />
            <Route path={`:depotId/${ENTITY_VIEW_STATES.edit}`} element={<EditDepot />} />
          </Route>
          <Route path={ENTITIES.drafts}>
            <Route index element={<Drafts />} />
            <Route path={`${ENTITY_VIEW_STATES.create}`} element={<CreateDraft />} />
            <Route path={`:draftId/${ENTITY_VIEW_STATES.view}`} element={<Draft />} />
            <Route path={`:draftId/${ENTITY_VIEW_STATES.edit}`} element={<EditDraft />} />
          </Route>
          <Route path={ENTITIES.runs}>
            <Route index element={<Runs />} />
            <Route path={`:runId/${ENTITY_VIEW_STATES.view}`} element={<Run />} />
          </Route>
        </Route>
        <Route path={`*`} element={<NotFound />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
