import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {mapActions, MapContext} from '../../../../features/map/context';
import {LatLngTuple} from 'leaflet';
import {DriverRoute, EvaluateResult, Order} from '../../../../../../evo-delivery-backend/src/types';
import {EntityList} from '../../../../features/entity-list/EntityList';
import {DriverRouteListItem} from './DriverRouteListItem';
import {useGetEntity} from '../../../../hooks/entities-api/use-get-entity';
import {useEntityId} from '../../../../hooks/router/use-entity-id';

export const Result = () => {
    const {dispatch} = useContext(MapContext);
    const [openCollapseItemKey, setOpenCollapseItemKey] = useState(null);
    const resultId = useEntityId();
    const {data: result, isFetching, isLoading, isError} = useGetEntity(resultId!);
    const colors = ['deepskyblue', 'crimson', 'seagreen', 'slateblue', 'gold', 'darkorange']; // Add colors and move it to central place

    useEffect(() => {
        if (result) {
            const orders = getOrdersFromResult(result);

            dispatch({
                type: mapActions.UPDATE_STATE,
                payload: {
                    routes: result.routes as DriverRoute[],
                    orders: orders,
                    depots: [result.depot],
                    zoom: 13,
                    routesColors: colors,
                    center: [result.depot?.latitude, result.depot?.longitude] as LatLngTuple
                },
            });
        }

        return () => dispatch({type: mapActions.CLEAR_STATE, payload: {}});
    }, [result]);

    const getOrdersFromResult = (result: EvaluateResult) => {
        return result.routes?.flatMap((driverRoute: DriverRoute) => (driverRoute.orders)) as Order[]
    }

    return (
        result && (
            <EntityList
                isLoading={isFetching || isLoading}
                isError={isError}
                items={result.routes}
                renderItem={(route: DriverRoute, index: any) => (
                    <DriverRouteListItem
                        route={route}
                        setOpenCollapseItemKey={setOpenCollapseItemKey}
                        openCollapseItemKey={openCollapseItemKey}
                        routeColor={colors[index]}
                    />

                )}
            />
        )
    );
};
