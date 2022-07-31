import React, { useReducer } from 'react';
import { mapState, mapAction, initialState, mapReducer } from './map-state-reducer';

export const MapContext = React.createContext<{
  state: mapState;
  dispatch: React.Dispatch<mapAction>;
}>({ state: initialState, dispatch: () => null });

export const MapContextProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [state, dispatch] = useReducer(mapReducer, initialState);

  const value = {
    state,
    dispatch,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};
