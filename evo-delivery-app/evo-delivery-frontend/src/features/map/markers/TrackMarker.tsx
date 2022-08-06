import {Marker, Polyline, Popup} from 'react-leaflet';
import {Typography} from '@mui/material';
import {Order} from '@backend/types';
import {Depot, DriverRoute} from "../../../../../evo-delivery-backend/src/types";
import {LatLngTuple} from "leaflet";

export const TrackMarker = ({routes, depot}: { routes?: DriverRoute[], depot?: Depot }) => {
    const colors = ['deepskyblue', 'crimson', 'seagreen', 'slateblue', 'gold', 'darkorange'];

    return (<>{
        routes?.map((driverRoute) => {
            const ordersCords = driverRoute.orders.map((order) => (
                [order.latitude, order.longitude] as LatLngTuple))
            const depotCords = [depot?.latitude, depot?.longitude]
            const polylineCords = [depotCords, ...ordersCords, depotCords] as LatLngTuple[]
            const random = Math.floor(Math.random() * colors.length);

            return <Polyline positions={polylineCords}
                             color={colors[random]}
                             fill={false}
                             smoothFactor={3}
                             weight={5}
                             opacity={0.666}
                             key={driverRoute.driver._id}>
                <Popup>
                    <Typography sx={{fontSize: 16, fontWeight: 'bold'}} component='div'>
                        Route Details
                    </Typography>
                    <Typography sx={{fontSize: 14}} color='text.secondary' gutterBottom>
                        {`Driver ID: ${driverRoute.driver._id}`} <br/>
                        {`Driver Name: ${driverRoute.driver.name}`} <br/>
                        {`Total Distance: ${driverRoute.totalDistance} kms`} <br/>
                        {`Load: ${driverRoute.load.toFixed(2)}%`}<br/>
                    </Typography>
                </Popup>
            </Polyline>;
        })
    }
    </>);
};

