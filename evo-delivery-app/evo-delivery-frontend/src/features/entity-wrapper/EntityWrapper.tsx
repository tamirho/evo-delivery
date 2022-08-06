import { Alert, AlertTitle, Skeleton, Stack } from '@mui/material';

type EntityWrapperProps = {
  item: any;
  isLoading: boolean;
  isError: boolean;
  renderItem: (item: any) => JSX.Element | null;
};

export const EntityWrapper = ({ item, isLoading, isError, renderItem: itemComponent }: EntityWrapperProps) => {
  if (isError) {
    return (
      <Alert severity='error' style={{ width: '100%', margin: 10 }}>
        <AlertTitle>Error</AlertTitle>
        Oh no! Something went wrong — <strong>check it out!</strong>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <Stack spacing={1}>
        <Skeleton variant='text' width={320} />
        <Skeleton variant='text' width={320} />
        <Skeleton variant='text' width={440} />
        <Skeleton variant='rectangular' width={440} height={90} />
      </Stack>
    );
  }

  return <div style={{ width: '100%', margin: 10 }}>{itemComponent(item)}</div>;
};
