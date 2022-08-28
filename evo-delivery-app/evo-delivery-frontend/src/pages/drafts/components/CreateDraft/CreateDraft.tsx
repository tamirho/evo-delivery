import * as React from 'react';
import { useCreateEntity } from '../../../../hooks/entities/use-create-entity';
import { useNavigateToParent } from '../../../../hooks/router/use-navigate-to-parent';
import { ENTITY_VIEW_STATES } from '../../../common';
import { DraftForm } from '../DraftForm/DraftForm';

export const CreateDraft = () => {
  const navigate = useNavigateToParent();
  const createFunc = useCreateEntity();
  
  const handleSubmit = (data :{} = {}) => {
    createFunc(data);
    navigate();
  };

  return <DraftForm state={ENTITY_VIEW_STATES.create} onSubmit={handleSubmit}/>;
};
