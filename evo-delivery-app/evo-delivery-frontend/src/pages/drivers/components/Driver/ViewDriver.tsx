import { Alert, AlertTitle, Skeleton, Stack } from "@mui/material";
import { useGetEntity } from "../../../../hooks/entities/use-get-entity";
import { useEntityId } from "../../../../hooks/router/use-entity-id";
import { useNavigateToEntityViewState } from "../../../../hooks/router/use-navigate-to-view-state";
import { ENTITY_VIEW_STATES } from "../../../common";
import { DriverForm } from "../DriverForm/DriverForm";

export const ViewDriver = () => {
  const driverId = useEntityId();
  const {
    data:{driver}= {},
    isError,
    isFetching,
    isLoading,
  } = useGetEntity(driverId as string);
  const navigateToState = useNavigateToEntityViewState();

  const handleSubmit = ()=> {
    navigateToState(ENTITY_VIEW_STATES.edit);
  }
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
      state={ENTITY_VIEW_STATES.view}
      onSubmit={handleSubmit}
    />
  );
};
