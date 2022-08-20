import {Marker, Polyline, Popup} from 'react-leaflet';
import {Typography} from '@mui/material';
import {Depot, DriverRoute} from "../../../../../evo-delivery-backend/src/types";
const decodePolyline = require('decode-google-map-polyline');

export const TrackMarker = ({routes, depot, colors}: { routes?: DriverRoute[], depot?: Depot, colors: string[]}) => {
    return ( <>{
        routes?.map((driverRoute, index) => {
            return driverRoute.polyLines &&
                <Polyline positions={driverRoute.polyLines.map(de => decodePolyline(de))}
                             color={colors[index % colors.length]}
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

