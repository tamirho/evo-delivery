import React, { useContext, useEffect } from "react";
import { OrderForm } from "../OrderForm/OrderForm";
import { ENTITY_VIEW_STATES } from "../../../common";
import { useEntityId } from "../../../../hooks/router/use-entity-id";
import { useUpdateEntity } from "../../../../hooks/entities/use-update-entity";
import { useGetEntity } from "../../../../hooks/entities/use-get-entity";
import { useNavigateToEntityViewState } from "../../../../hooks/router/use-navigate-to-edit";
import Alert from "@mui/material/Alert";
import { AlertTitle, Skeleton, Stack } from "@mui/material";
import { MapContext, mapActions } from "../../../../features/map/context";

export const EditOrder = () => {
  const orderId = useEntityId();
  const {
    data: { order } = {},
    isError,
    isFetching,
    isLoading,
  } = useGetEntity(orderId as string);
  const { dispatch } = useContext(MapContext);
  const updateFunc = useUpdateEntity();
  const navigateToState = useNavigateToEntityViewState();

  const handleSubmit = (data = {}) => {
    updateFunc(orderId as string, data);
    navigateToState(ENTITY_VIEW_STATES.view);
  };

  useEffect(() => {
    if (order) {
      dispatch({
        type: mapActions.UPDATE_STATE,
        payload: {
          orders: [order],
          zoom: 12,
          center: [order.latitude!, order.longitude!],
        },
      });
    }
  });

  if (isError) {
    return (
      <Alert severity="error" style={{ width: "100%", margin: 10 }}>
        <AlertTitle>Error</AlertTitle>
        Oh no! Something went wrong — <strong>check it out!</strong>
      </Alert>
    );
  }

  if (isLoading || isFetching) {
    return (
      <Stack spacing={1}>
        <Skeleton variant="text" width={320} />
        <Skeleton variant="text" width={320} />
        <Skeleton variant="text" width={440} />
        <Skeleton variant="rectangular" width={440} height={90} />
      </Stack>
    );
  }
  return (
    <OrderForm
      order={order}
      onSubmit={handleSubmit}
      state={ENTITY_VIEW_STATES.edit}
    />
  );
};
