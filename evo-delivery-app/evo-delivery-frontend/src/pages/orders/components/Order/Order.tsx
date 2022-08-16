import React, { useContext, useEffect } from "react";
import { Order as OrderType } from "@backend/types";

import { MapContext, mapActions } from "../../../../features/map/context";
import { EntityWrapper } from "../../../../features/entity-wrapper/EntityWrapper";
import { useEntityId } from "../../../../hooks/router/use-entity-id";
import { Alert, AlertTitle, Button, Skeleton, Stack } from "@mui/material";
import { useNavigateToParent } from "../../../../hooks/router/use-navigate-to-parent";
import { useGetEntity } from "../../../../hooks/entities-api/use-get-entity";
import { ENTITY_VIEW_STATES } from "../../../common";
import { OrderForm } from "../OrderForm/OrderForm";
import { useNavigateToEntityViewState } from "../../../../hooks/router/use-navigate-to-edit";

export const Order = () => {
  const { dispatch } = useContext(MapContext);
  const orderId = useEntityId();
  const {
    data: { order } = {},
    isFetching,
    isLoading,
    isError,
  } = useGetEntity(orderId!);

  const navigateToState = useNavigateToEntityViewState();

  const handleSubmit = () => {
    navigateToState(ENTITY_VIEW_STATES.edit);
  };

  useEffect(() => {
    if (order) {
      dispatch({
        type: mapActions.UPDATE_STATE,
        payload: {
          orders: [order],
          zoom: 14,
          center: [order.latitude!, order.longitude!],
        },
      });
    }

    return () => dispatch({ type: mapActions.CLEAR_STATE, payload: {} });
  }, [order]);

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
      state={ENTITY_VIEW_STATES.view}
      onSubmit={handleSubmit}
    />
  );
};
