import { LatLngExpression } from 'leaflet';
import { useContext } from 'react';
import { useMapEvents } from 'react-leaflet';
import { mapActions, MapContext } from './context';

export const MapHandlers = () => {
  const { dispatch, state } = useContext(MapContext);

  const mapEvents = useMapEvents({
    zoomend: () => {
      if (state.zoom !== mapEvents.getZoom()) {
        dispatch({ type: mapActions.UPDATE_ZOOM, payload: { zoom: mapEvents.getZoom() } });
      }
    },
    moveend: () => {
      if (!mapEvents.getCenter().equals(state.center as LatLngExpression)) {
        dispatch({ type: mapActions.UPDATE_CENTER, payload: { center: mapEvents.getCenter() } });
      }
    },
  });

  return null;
};
