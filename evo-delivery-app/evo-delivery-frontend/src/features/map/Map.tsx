import React, {useContext} from 'react';
import {LeafletMap} from './LeafletMap';
import {MapContext} from './context';
import {OrdersDrawer} from './drawers/OrdersDrawer';
import {DepotsDrawer} from './drawers/DepotsDrawer';

import 'leaflet/dist/leaflet.css';
import {ResultsDrawer} from "./drawers/ResultsDrawer";

export const Map = () => {
    const {state: mapState} = useContext(MapContext);
    const {center, zoom} = mapState;

    return (
        <LeafletMap center={center} zoom={zoom}>
            <ResultsDrawer/>
            <OrdersDrawer/>
            <DepotsDrawer/>
        </LeafletMap>
    );
};
