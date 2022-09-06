import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useGetEntity } from '../../../../hooks/entities/use-get-entity';
import { useUpdateEntity } from '../../../../hooks/entities/use-update-entity';
import { useEntityId } from '../../../../hooks/router/use-entity-id';
import { useNavigateToEntityViewState } from '../../../../hooks/router/use-navigate-to-view-state';
import { ENTITY_VIEW_STATES } from '../../../common';
import { DepotForm } from '../DepotForm/DepotForm';

export const EditDepot = () => {
      const depotId = useEntityId();
      const {
        data: { depot } = {},
        isError,
        isFetching,
        isLoading,
      } = useGetEntity(depotId as string);

      const updateFunc = useUpdateEntity();
      const navigateToState = useNavigateToEntityViewState();
      const handleSubmit = (data = {}) => {
        updateFunc(depotId as string, data);
        navigateToState(ENTITY_VIEW_STATES.view);
      };

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
          state={ENTITY_VIEW_STATES.edit}
          onSubmit={handleSubmit}
        />
      );
}