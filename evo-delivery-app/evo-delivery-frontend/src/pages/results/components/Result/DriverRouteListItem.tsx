import {useContext, useMemo} from "react";
import {
    Avatar,
    Collapse,
    List, ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {ExpandLess, ExpandMore, StarBorder} from "@mui/icons-material";
import * as React from "react";
import {mapActions, MapContext} from "../../../../features/map/context";
import {DriverRoute, Order} from "../../../../../../evo-delivery-backend/src/types";
import {LatLngTuple} from "leaflet";
import {useFocusLocation} from "../../../../hooks/map/use-focus-location";


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

    const focusOrder = useFocusLocation();

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
                                          }
                            />
                        </ListItemButton>
                    ))
                }
            </List>
        </Collapse>
    </>);
};