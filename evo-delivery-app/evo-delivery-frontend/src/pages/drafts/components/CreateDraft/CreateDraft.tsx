import * as React from 'react';
import { useCreateEntity } from '../../../../hooks/entities/use-create-entity';
import { useNavigateToEntity } from '../../../../hooks/router/use-navigate-to-entity';
import { ENTITY_VIEW_STATES } from '../../../common';
import { DraftForm } from '../DraftForm/DraftForm';

export const CreateDraft = () => {
  const navigate = useNavigateToEntity();
  const createFunc = useCreateEntity();
  
  const handleSubmit = async (data :{} = {}) => {
    const response = await createFunc(data);
    navigate(response.data.draft._id);
  };

  return <DraftForm state={ENTITY_VIEW_STATES.create} onSubmit={handleSubmit}/>;
};
