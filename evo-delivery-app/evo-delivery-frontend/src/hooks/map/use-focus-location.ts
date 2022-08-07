import { useContext } from 'react';
import { MapContext, mapActions } from '../../features/map/context';

export const useFocusLocation = () => {
  const { dispatch } = useContext(MapContext);

  return (item: { latitude?: number; longitude?: number }, zoom = 17) =>
    dispatch({ type: mapActions.UPDATE_STATE, payload: { center: [item.latitude!, item.longitude!], zoom } });
};
