import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { mapActions, MapContext } from "../../../../features/map/context";
import { LatLngTuple } from "leaflet";
import {
  Depot,
  DriverRoute,
  EvaluateResult,
  Order,
} from "../../../../../../evo-delivery-backend/src/types";
import { EntityList } from "../../../../features/entity-list/EntityList";
import { DriverRouteListItem } from "./DriverRouteListItem";
import { useGetEntity } from "../../../../hooks/entities-api/use-get-entity";
import { useEntityId } from "../../../../hooks/router/use-entity-id";
import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useFocusLocation } from "../../../../hooks/map/use-focus-location";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import { useQuery } from "@tanstack/react-query";
import { useEntityName } from "../../../../hooks/router/use-entity-name";

export const Result = () => {
  const { dispatch } = useContext(MapContext);
  const [openCollapseItemKey, setOpenCollapseItemKey] = useState(null);
  const resultId = useEntityId();
  const {
    data: result,
    isFetching,
    isLoading,
    isError,
  } = useGetEntity(resultId!);
  const colors = [
    "deepskyblue",
    "crimson",
    "seagreen",
    "slateblue",
    "gold",
    "darkorange",
  ]; // Add colors and move it to central place

  const focusOrder = useFocusLocation();
  const interval = setInterval(() => {
    UpdateMap();
  }, 1000);
  
  const UpdateMap = async () => {
    const response = await fetch(`api/v1/results/${resultId}`);
    const tempResult = await response.json();
    console.log("interval");
    if (tempResult) {
      const orders = getOrdersFromResult(tempResult.data);

      dispatch({
        type: mapActions.UPDATE_STATE,
        payload: {
          // geoCodedRoutes: planGeoCodedRoutesPerDriver,
          routes: tempResult.data.routes as DriverRoute[],
          orders: orders,
          depots: [tempResult.data.depot],
          zoom: 13,
          routesColors: colors,
          center: [
            tempResult.data.depot?.latitude,
            tempResult.data.depot?.longitude,
          ] as LatLngTuple,
        },
      });
    }
  };

  useEffect(() => {
    
    if (result) {
      const orders = getOrdersFromResult(result);

      dispatch({
        type: mapActions.UPDATE_STATE,
        payload: {
          // geoCodedRoutes: planGeoCodedRoutesPerDriver,
          routes: result.routes as DriverRoute[],
          orders: orders,
          depots: [result.depot],
          zoom: 13,
          routesColors: colors,
          center: [
            result.depot?.latitude,
            result.depot?.longitude,
          ] as LatLngTuple,
        },
      });
    }

    return () => {
      dispatch({ type: mapActions.CLEAR_STATE, payload: {} });
      clearInterval(interval);
    };
  }, [result]);

  const getOrdersFromResult = (result: EvaluateResult) => {
    return result.routes?.flatMap(
      (driverRoute: DriverRoute) => driverRoute.orders
    ) as Order[];
  };

  const renderDepotListItem = () => (
    <>
      <ListItem
        key={result.depot?._id}
        disablePadding
        alignItems="center"
        secondaryAction={
          <>
            <Tooltip title="Focus Order">
              <IconButton
                edge="end"
                aria-label="comments"
                size="small"
                onClick={() => focusOrder(result.depot)}
              >
                <ZoomInMapIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </>
        }
      >
        <ListItemButton>
          <ListItemAvatar>
            <Avatar>
              <WarehouseIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`Depot Name: ${result.depot?.name}`}
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  {`ID: ${result.depot?._id}`} <br />
                </Typography>
              </>
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider
        key={`divider_${result.depot?._id}`}
        variant="middle"
        component="li"
      />
    </>
  );

  return (
    result && (
      <>
        <EntityList
          key={"blalal"}
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
          optionalComponent={renderDepotListItem()}
        />
      </>
    )
  );
};
