import {useContext} from 'react';
import {MapContext} from '../context';
import {TrackMarker} from "../markers/TrackMarker";


export const RoutesDrawer = () => {
    const {state: mapState} = useContext(MapContext);
    const {routes, depots} = mapState;

    const renderRouteMarkers = () => {
        return depots?.map(depot =>
            <TrackMarker routes={routes} depot={depot} />
        )
    }

    return (
        <>{
            routes && renderRouteMarkers()
        }
        </>
    );
};

