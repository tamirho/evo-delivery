import { Alert, AlertTitle, Stack, Skeleton } from '@mui/material';
import * as React from 'react';
import { useCreateEntity } from '../../../../hooks/entities/use-create-entity';
import { useGetEntity } from '../../../../hooks/entities/use-get-entity';
import { useEntityId } from '../../../../hooks/router/use-entity-id';
import { useNavigateToEntity } from '../../../../hooks/router/use-navigate-to-entity';
import { ENTITY_VIEW_STATES } from '../../../common';
import { DraftForm } from '../DraftForm/DraftForm';

export const CloneDraft = () => {
  const draftId = useEntityId();
  const { data: { draft } = {}, isError, isLoading, isFetching } = useGetEntity(draftId!);

  const navigate = useNavigateToEntity();
  const createFunc = useCreateEntity();

  const handleSubmit = async (data: {} = {}) => {
    const response = await createFunc(data);
    navigate(response.data.draft._id);
  };

  if (isError) {
    return (
      <Alert severity='error' style={{ width: '100%', margin: 10 }}>
        <AlertTitle>Error</AlertTitle>
        Oh no! Something went wrong — <strong>check it out!</strong>
      </Alert>
    );
  }

  if (isLoading || isFetching) {
    return (
      <Stack spacing={1}>
        <Skeleton variant='text' width={320} />
        <Skeleton variant='text' width={320} />
        <Skeleton variant='text' width={440} />
        <Skeleton variant='rectangular' width={440} height={90} />
      </Stack>
    );
  }

  return <DraftForm state={ENTITY_VIEW_STATES.clone} onSubmit={handleSubmit} draft={draft} />;
};
