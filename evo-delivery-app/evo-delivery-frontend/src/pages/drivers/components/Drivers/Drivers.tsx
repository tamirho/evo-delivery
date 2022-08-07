import { Driver } from "@backend/types";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EntityList } from "../../../../features/entity-list/EntityList";
import { ENTITY_VIEW_STATES } from "../../../common";
import { useDrivers } from "../../hooks/use-drivers";
import DeleteIcon from "@mui/icons-material/Delete";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useMemo } from "react";
import { useGetEntities } from "../../../../hooks/entities-api/use-get-entities";
import { useDeleteEntity } from "../../../../hooks/entities-api/use-delete-entity";

const drivers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9].map(
  (item, index) => ({
    _id: `134523452345${item}${index}`,
    name: `some name ${item}${index}`,
    maxCapacity: index + 100,
    maxDistance: index + 200,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
);

export const Drivers = () => {
  const { data, isFetching, isLoading, isError } = useGetEntities();

  const navigate = useNavigate();
  const location = useLocation();
  const goToEntity = useMemo(
    () => (id: string) =>
      navigate(`${id}/${ENTITY_VIEW_STATES.view}${location.search}`),
    []
  );
  const deleteOrder = useDeleteEntity();

  return (
    <EntityList
      isLoading={isFetching || isLoading}
      isError={isError}
      items={data}
      renderItem={(driver: Driver) => (
        <>
          <ListItem
            key={driver._id}
            disablePadding
            alignItems="center"
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="comments"
                size="small"
                onClick={() => deleteOrder(driver._id)}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <ListItemButton onClick={() => goToEntity(driver._id)}>
              <ListItemAvatar>
                <Avatar>
                  <DriveEtaIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`ID: ${driver._id}`}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {`${driver.name}`}
                    </Typography>
                    {` Capacity- ${driver.maxCapacity}`}
                    {` Distance- ${driver.maxDistance}`}
                  </>
                }
              />
            </ListItemButton>
          </ListItem>
          <Divider
            key={`divider_${driver._id}`}
            variant="middle"
            component="li"
          />
        </>
      )}
    />
  );
};
