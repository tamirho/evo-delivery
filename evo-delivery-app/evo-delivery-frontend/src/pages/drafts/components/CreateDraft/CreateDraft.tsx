import * as React from 'react';
import { ENTITY_VIEW_STATES } from '../../../common';
import { DraftForm } from '../DraftForm/DraftForm';

export const CreateDraft = () => {
  return <DraftForm state={ENTITY_VIEW_STATES.create} />;
};
