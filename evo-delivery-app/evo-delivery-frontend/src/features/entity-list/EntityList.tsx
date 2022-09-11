import { Alert, AlertTitle, Box, Divider, List, ListItem, Skeleton, Stack, TextField } from '@mui/material';
import { useState } from 'react';

type EntityListProps = {
  items: any[];
  isLoading: boolean;
  isError: boolean;
  renderItem: (item: any, index: number) => JSX.Element | null;
  optionalComponent?: any;
  dense?: boolean;
  withFilter?: (obj: any, text: string) => boolean;
  filterPlaceholder?: string
};

export const EntityList = ({
  items,
  isLoading,
  isError,
  renderItem: itemComponent,
  optionalComponent,
  dense,
  withFilter,
  filterPlaceholder,
}: EntityListProps) => {
  const [filter, setFilter] = useState('');

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
      <List dense={!!dense}>
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

  const filteredItems = withFilter && filter !== '' ? items.filter((item) => withFilter(item, filter)) : items;
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFilter(event.target.value);
  };
  console.log(filter);

  return (
    <>
      <List dense={!!dense} style={{ width: '100%' }}>
        {withFilter ? (
          <ListItem key='filter-list-item' alignItems='center'>
            <TextField
              id='text-filter-list-item'
              label='Filter'
              variant='outlined'
              fullWidth
              onChange={handleFilterChange}
              placeholder={filterPlaceholder}
            />
          </ListItem>
        ) : null}
        {optionalComponent || null}
        {filteredItems.map((item: any, index) => itemComponent(item, index))}
      </List>
    </>
  );
};
