import { Depot } from '@backend/types';
import { useContext } from 'react';
import { MapContext } from '../context';
import { DepotMarker } from '../markers/DepotMarker';

export const DepotsDrawer = () => {
  const { state: mapState } = useContext(MapContext);
  const { depots } = mapState;

  return (
    <>
      {depots?.map((depot: Depot) => (
        <DepotMarker key={depot._id} depot={depot} />
      ))}
    </>
  );
};
