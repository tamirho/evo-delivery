import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {mapActions, MapContext} from "../../../../features/map/context";
import {LatLngTuple} from "leaflet";
import {DriverRoute} from "../../../../../../evo-delivery-backend/src/types";
import {EntityList} from "../../../../features/entity-list/EntityList";
import {DriverRouteListItem} from "./DriverRouteListItem";
import {useGetEntity} from "../../../../hooks/entities-api/use-get-entity";
import {useEntityId} from "../../../../hooks/router/use-entity-id";


export const Result = () => {
    const {dispatch} = useContext(MapContext);
    const [openCollapseItemKey, setOpenCollapseItemKey] = useState(null);
    const resultId = useEntityId();
    const { data: result, isFetching, isLoading, isError } = useGetEntity(resultId!);

    useEffect(() => {
        if (result) {
            dispatch({
                type: mapActions.UPDATE_RESULTS,
                payload: {result: result, zoom: 13, }
            });
            dispatch({
                type: mapActions.UPDATE_CENTER,
                payload: {center: [result.depot?.latitude, result.depot?.longitude] as LatLngTuple }
            });
        }

        return () => dispatch({type: mapActions.CLEAR_STATE, payload: {}});
    }, []);


    return (result && <EntityList
        isLoading={(isFetching || isLoading)}
        isError={isError}
        items={result.routes}
        renderItem={(route: DriverRoute) => (
            <DriverRouteListItem route={route} setOpenCollapseItemKey={setOpenCollapseItemKey} openCollapseItemKey={openCollapseItemKey} />
        )}
    />)
};