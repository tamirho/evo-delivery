import { Alert, AlertTitle, Skeleton, Stack } from "@mui/material";
import { useGetEntity } from "../../../../hooks/entities/use-get-entity";
import { useUpdateEntity } from "../../../../hooks/entities/use-update-entity";
import { useEntityId } from "../../../../hooks/router/use-entity-id";
import { useNavigateToEntityViewState } from "../../../../hooks/router/use-navigate-to-edit";
import { ENTITY_VIEW_STATES } from "../../../common";
import { DriverForm } from "../DriverForm/DriverForm";

export const EditDriver = () => {
  const driverId = useEntityId();
  const {
    data: { driver } = {},
    isError,
    isFetching,
    isLoading,
  } = useGetEntity(driverId as string);

  const updateFunc = useUpdateEntity();
  const navigateToState = useNavigateToEntityViewState();
  const handleSubmit = (data = {}) => {
    updateFunc(driverId as string, data);
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
    <DriverForm
      driver={driver}
      state={ENTITY_VIEW_STATES.edit}
      onSubmit={handleSubmit}
    />
  );
};
