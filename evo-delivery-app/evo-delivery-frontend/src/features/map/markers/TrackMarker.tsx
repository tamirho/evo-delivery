import {Marker, Polyline, Popup} from 'react-leaflet';
import {Typography} from '@mui/material';
import {Order} from '@backend/types';
import {Depot, DriverRoute} from "../../../../../evo-delivery-backend/src/types";
import {LatLngTuple} from "leaflet";

export const TrackMarker = ({routes, depot}: { routes?: DriverRoute[], depot?: Depot }) => {
    const colors = ['deepskyblue', 'crimson', 'seagreen', 'slateblue', 'gold', 'darkorange'];

    return (<>
        {
            routes?.map((driverRoute) => {
                const cords = driverRoute.orders.map((order) => {
                    return [order.latitude, order.longitude] as LatLngTuple
                })

                const depotCords = [depot?.latitude, depot?.longitude]
                const cordsWithDepot = [depotCords, ...cords, depotCords] as LatLngTuple[]
                const random = Math.floor(Math.random() * colors.length);
                return <Polyline positions={cordsWithDepot} color={colors[random]} key={driverRoute.driver._id}/>;
            })
        }
    </>);
};

