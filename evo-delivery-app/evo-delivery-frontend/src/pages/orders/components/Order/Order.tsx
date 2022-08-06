import React, { useContext, useEffect } from 'react';
import { Order as OrderType } from '@backend/types';

import { MapContext, mapActions } from '../../../../features/map/context';
import { EntityWrapper } from '../../../../features/entity-wrapper/EntityWrapper';
import { useEntityId } from '../../../../hooks/router/use-entity-id';
import { Button } from '@mui/material';
import { useNavigateToParent } from '../../../../hooks/router/use-navigate-to-parent';
import { useGetEntity } from '../../../../hooks/entities-api/use-get-entity';

export const Order = () => {
  const { dispatch } = useContext(MapContext);
  const orderId = useEntityId();
  const { data: { order } = {}, isFetching, isLoading, isError } = useGetEntity(orderId!);

  const navigateToParent = useNavigateToParent();

  useEffect(() => {
    if (order) {
      dispatch({
        type: mapActions.UPDATE_STATE,
        payload: { orders: [order], zoom: 14, center: [order.latitude!, order.longitude!] },
      });
    }

    return () => dispatch({ type: mapActions.CLEAR_STATE, payload: {} });
  }, [order]);

  return (
    <EntityWrapper
      isLoading={isFetching || isLoading}
      isError={isError}
      item={order}
      renderItem={(order: OrderType) => (
        <div>
          Hello {order?._id}
          <Button onClick={navigateToParent}>hey</Button>
        </div>
      )}
    />
  );
};
