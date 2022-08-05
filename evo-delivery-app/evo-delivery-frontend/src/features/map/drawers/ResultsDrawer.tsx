import {useContext} from 'react';
import {OrderMarker} from '../markers/OrderMarker';
import {MapContext} from '../context';
import {Depot, EvaluateResult} from "../../../../../evo-delivery-backend/src/types";
import {DepotMarker} from "../markers/DepotMarker";
import {TrackMarker} from "../markers/TrackMarker";


export const ResultsDrawer = () => {
    const {state: mapState} = useContext(MapContext);
    const {result} = mapState;
    const {routes, depot} = result as EvaluateResult;


    const renderOrdersMarkers = () => (
        routes?.flatMap((driverRoute) => (
            driverRoute.orders.map((order) => (
                <OrderMarker order={order} key={order._id}/>
            ))
        ))
    );

    const renderDepotMarker = () => (
        <DepotMarker depot={depot as Depot} key={depot?._id}/>
    );

    const renderRouteMarkers = () => {
        return <TrackMarker routes={routes} depot={depot} />
    }

    return (
        <>{
            routes && renderOrdersMarkers()
        }{
            depot && renderDepotMarker()
        }{
            routes && renderRouteMarkers()
        }
        </>
    );
};

