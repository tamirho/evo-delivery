import {Dispatch, SetStateAction, useContext, useMemo, useState} from "react";
import {
    Avatar,
    Collapse,
    IconButton,
    List, ListItem,
    ListItemAvatar,
    ListItemButton, ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {ExpandLess, ExpandMore, StarBorder} from "@mui/icons-material";
import * as React from "react";
import {mapActions, MapContext} from "../../../../features/map/context";
import {Depot, DriverRoute, EvaluateResult, Order} from "../../../../../../evo-delivery-backend/src/types";
import {LatLngTuple} from "leaflet";
import {ENTITY_VIEW_STATES} from "../../../common";
import {useLocation, useNavigate} from "react-router-dom";
import RouteIcon from '@mui/icons-material/Route';

type ResultsListItemProps = {
    route: DriverRoute
    setOpenCollapseItemKey: (value: any) => void
    openCollapseItemKey: any
};


export const DriverRouteListItem = ({
                                        route,
                                        setOpenCollapseItemKey,
                                        openCollapseItemKey
                                    }: ResultsListItemProps) => {
    const {dispatch} = useContext(MapContext);

    const focusOrder = useMemo(
        () => (order: Order) => {
            dispatch({
                type: mapActions.UPDATE_CENTER,
                payload: {center: [order.latitude, order.longitude] as LatLngTuple}
            });
            dispatch({
                type: mapActions.UPDATE_ZOOM,
                payload: {zoom: 13}
            });
        },
        []
    );

    return (<>
        <ListItem
            key={route.driver._id}
            disablePadding
            alignItems='center'
        >
            <ListItemButton onClick={() => {
                setOpenCollapseItemKey(route.driver._id as string)
            }}>
                <ListItemAvatar>
                    <Avatar>
                        <LocalShippingIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={`Driver Name: ${route.driver.name}`}
                    secondary={
                        <>
                            <Typography sx={{display: 'inline'}} component='span' variant='body2'
                                        color='text.secondary'>
                                {`ID: ${route.driver._id}`} <br/>
                                {`Maximum Capacity: ${route.driver.maxCapacity} kg`} <br/>
                                {`Maximum Travel Distance: ${route.driver.maxDistance} km`} <br/>
                                {`Travel Load: ${route.load.toFixed(2)}%`} <br/>
                                {`Travel Distance: ${route.totalDistance} kms`} <br/>
                            </Typography>
                        </>
                    }
                />
                {openCollapseItemKey === route.driver._id ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
        </ListItem>
        <Collapse in={openCollapseItemKey === route.driver._id} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {
                    route.orders.map((order, index) => (
                        <ListItemButton onClick={() => {
                            focusOrder(order)
                        }}
                                        sx={{pl: 10}}>
                            <ListItemText primary={`${index + 1}.  ${order.address}`}
                                          secondary={
                                              <>
                                                  <Typography sx={{display: 'inline'}} component='span' variant='body2'
                                                              color='text.secondary'>
                                                      {`Order ID: ${order._id}`} <br/>
                                                      {`Weight: ${order.weight} kg`} <br/>
                                                  </Typography>
                                              </>
                                          }/>
                        </ListItemButton>
                    ))
                }
            </List>
        </Collapse>
    </>);
};