import { useContext, useEffect, useState } from "react";
import { mapActions, MapContext } from "../../../../features/map/context";
import { LatLngTuple } from "leaflet";
import {
  DriverRoute,
  EvaluateResult,
  Order,
} from "../../../../../../evo-delivery-backend/src/types";
import { EntityList } from "../../../../features/entity-list/EntityList";
import { DriverRouteListItem } from "./DriverRouteListItem";
import { useEntityId } from "../../../../hooks/router/use-entity-id";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { useFocusLocation } from "../../../../hooks/map/use-focus-location";
import { usePollingEffect } from "../../hooks/use-polling-effect";
import { ENTITIES } from "../../../common";

import StopIcon from "@mui/icons-material/Stop";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import { fetchEntity } from "../../../../api/entities/fetch-entity";

export const Result = () => {
  const [result, setResult] = useState<EvaluateResult>({});
  const [stopPolling, setStopPolling] = useState(false);
  const { dispatch } = useContext(MapContext);
  const [openCollapseItemKey, setOpenCollapseItemKey] = useState(null);
  const resultId = useEntityId();
  const colors = [
    "deepskyblue",
    "crimson",
    "seagreen",
    "slateblue",
    "gold",
    "darkorange",
  ]; // Add colors and move it to central place

  const focusLocation = useFocusLocation();
  const stopThePolling = () => setStopPolling(true);
  const [killPoll, respawnPoll] = usePollingEffect(async () => setResult(await fetchEntity(ENTITIES.results, resultId!)), [], {
    interval: 3000,
  });

  useEffect(() => {
    if (result) {
      const orders = getOrdersFromResult(result);

      dispatch({
        type: mapActions.UPDATE_STATE,
        payload: {
          // geoCodedRoutes: planGeoCodedRoutesPerDriver,
          routes: result.routes as DriverRoute[],
          orders: orders,
          depots: [result.depot!],
          // zoom: 13,
          routesColors: colors,
          // ...(result.depot ? { center: [result.depot.latitude, result.depot.longitude] as LatLngTuple } : {}),
        },
      });

      if (result.isDone === true) {
        killPoll();
      }
    }

    return () => {
      dispatch({ type: mapActions.CLEAR_STATE, payload: {} });
      stopThePolling();
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
                onClick={() => result.depot && focusLocation(result.depot)}
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
                  {`Is Done: ${result.isDone}`} <br />
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
          key={"result-entity-list"}
          isLoading={!stopPolling && !result}
          isError={stopPolling && !result}
          items={result.routes || []}
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
        {!stopPolling && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "20px",
            }}
          >
            <Box sx={{ position: "absolute", bottom: "20px" }}>
              <Button
                variant="contained"
                color="error"
                style={{ borderRadius: 50 }}
                startIcon={<StopIcon />}
                onClick={stopThePolling}
              >
                Stop Polling
              </Button>
            </Box>
          </Box>
        )}
      </>
    )
  );
};
