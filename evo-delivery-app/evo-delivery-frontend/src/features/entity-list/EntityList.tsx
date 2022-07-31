import {
  Alert,
  AlertTitle,
  Divider,
  List,
  ListItem,
  Skeleton,
  Stack,
} from '@mui/material';

type EntityListProps = {
  items: any[];
  isLoading: boolean;
  isError: boolean;
  renderItem: (item: any) => JSX.Element;
};

export const EntityList = ({ items, isLoading, isError, renderItem: itemComponent }: EntityListProps) => {
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
      <List>
        {[...Array(15)].map((_, index) => (
          <>
            <ListItem key={`skeleton_${index}`}>
              <Stack spacing={1}>
                <Skeleton variant='text' width={320} />
                <Skeleton variant='rectangular' width={440} height={45} />
              </Stack>
            </ListItem>
            <Divider key={`divider_${index}`} variant='middle' component='li' />
          </>
        ))}
      </List>
    );
  }

  return <List style={{ width: '100%', margin: 10 }}>{items.map((item: any) => itemComponent(item))}</List>;
};
