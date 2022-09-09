import {
    Avatar,
    Collapse, Divider, IconButton,
    List, ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText, Tooltip,
    Typography
} from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {DriverRoute} from "../../../../../../evo-delivery-backend/src/types";
import {useFocusLocation} from "../../../../hooks/map/use-focus-location";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import * as React from "react";

type ResultsListItemProps = {
    route: DriverRoute
    setOpenCollapseItemKey: (value: any) => void
    openCollapseItemKey: any,
    routeColor: string
};


export const DriverRouteListItem = ({
                                        route,
                                        setOpenCollapseItemKey,
                                        openCollapseItemKey,
                                        routeColor
                                    }: ResultsListItemProps) => {
    const focusOrder = useFocusLocation();

    const renderCollapseIcon = () => {
        if (route.orders.length > 0) {
            return openCollapseItemKey === route.driver._id ? <ExpandLess/> : <ExpandMore/>
        }
    }

    const hasLoadConstraintViolated = route.load > 100;

    const hasTravelDistanceConstraintViolated = route.totalDistance > route.driver.maxDistance;

    return (<>
        <ListItem
            key={route.driver._id}
            disablePadding
            alignItems='center'
        >
            {
                hasLoadConstraintViolated || hasTravelDistanceConstraintViolated ? <PriorityHighIcon color={'error'}/> : <></>
            }
            <ListItemButton onClick={() => {
                if(openCollapseItemKey !== route.driver._id)
                    setOpenCollapseItemKey(route.driver._id as string)
                else
                    setOpenCollapseItemKey(null)
            }}>
                <ListItemAvatar>
                    <Avatar sx={{bgcolor: routeColor}}>{route.driver.name.split(' ').map((word) => word[0])}</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={`Driver Name: ${route.driver.name}`}
                    secondary={
                        <>
                            <Typography color='text.primary'> {`ID: ${route.driver._id}`} </Typography>
                            <br/>

                            <Typography sx={{display: 'inline'}} component='span' variant='body2'
                                        color='text.secondary'>
                                {`Driver's maximum travel distance: ${route.driver.maxDistance} KMs`}
                            </Typography>
                            <br/>
                            <Typography sx={{display: 'inline'}} component='span' variant='body2' color={
                                hasTravelDistanceConstraintViolated ? 'error' : 'text.secondary'
                            }> {`Planned travel distance: ${route.totalDistance.toFixed(2)} KMs`}  </Typography>
                            <br/>
                            <br/>
                            <Typography sx={{display: 'inline'}} component='span' variant='body2'
                                        color='text.secondary'>
                                {`Driver's maximum load: ${route.driver.maxCapacity} KGs`}
                            </Typography>
                            <br/>
                            <Typography sx={{display: 'inline'}} component='span' variant='body2' color={
                                hasLoadConstraintViolated ? 'error' : 'text.secondary'
                            }> {`Planned travel load: ${route.load.toFixed(2)}%`}  </Typography>
                        </>
                    }
                />
                {
                    renderCollapseIcon()
                }
            </ListItemButton>
        </ListItem>
        <Collapse in={openCollapseItemKey === route.driver._id} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {
                    route.orders.map((order, index) => (
                        <ListItem key={order._id}
                                  disablePadding
                                  alignItems='center'
                                  secondaryAction={
                                      <>
                                          <Tooltip title='Focus Order'>
                                              <IconButton edge='end' aria-label='comments' size='small'
                                                          onClick={() => focusOrder(order)}>
                                                  <ZoomInMapIcon fontSize='inherit'/>
                                              </IconButton>
                                          </Tooltip>
                                      </>
                                  }
                        >
                            <ListItemButton sx={{pl: 10}}>
                                <ListItemText primary={`${index + 1}.  ${order.address}`}
                                              secondary={
                                                  <>
                                                      <Typography sx={{display: 'inline'}} component='span'
                                                                  variant='body2'
                                                                  color='text.secondary'>
                                                          {`Order ID: ${order._id}`} <br/>
                                                          {`Weight: ${order.weight} kg`} <br/>
                                                      </Typography>
                                                  </>
                                              }
                                />
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </Collapse>
        <Divider key={`divider_${route.driver._id}`} variant='middle' component='li'/>
    </>);
};