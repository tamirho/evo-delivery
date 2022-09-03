import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import { useContext, useEffect } from 'react';
import { mapActions, MapContext } from '../../../../features/map/context';
import { useGetEntity } from '../../../../hooks/entities/use-get-entity';
import { useEntityId } from '../../../../hooks/router/use-entity-id';
import { useNavigateToEntityViewState } from '../../../../hooks/router/use-navigate-to-edit';
import { ENTITY_VIEW_STATES } from '../../../common';
import { DepotForm } from '../DepotForm/DepotForm';

export const Depot = () => {
     const { dispatch } = useContext(MapContext);
     const depotId = useEntityId();
     const {
       data: { depot } = {},
       isFetching,
       isLoading,
       isError,
     } = useGetEntity(depotId!);

     const navigateToState = useNavigateToEntityViewState();

     const handleSubmit = () => {
       navigateToState(ENTITY_VIEW_STATES.edit);
     };

     useEffect(() => {
       if (depot) {
         dispatch({
           type: mapActions.UPDATE_STATE,
           payload: {
             depots: [depot],
             zoom: 12,
             center: [depot.latitude!, depot.longitude!],
           },
         });
       }

       return () => dispatch({ type: mapActions.CLEAR_STATE, payload: {} });
     }, [depot]);

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
       <DepotForm
         depot={depot}
         state={ENTITY_VIEW_STATES.view}
         onSubmit={handleSubmit}
       />
     );
}