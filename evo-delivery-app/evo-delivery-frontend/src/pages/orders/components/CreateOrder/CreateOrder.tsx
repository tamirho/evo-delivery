import * as React from 'react';
import { OrderForm } from '../OrderForm/OrderForm';
import { ENTITY_VIEW_STATES } from '../../../common';
import { useNavigateToParent } from '../../../../hooks/router/use-navigate-to-parent';
import { useCreateEntity } from '../../../../hooks/entities-api/use-create-entity';


export const CreateOrder = () => {
      const navigate = useNavigateToParent();
      const createFunc = useCreateEntity();

      const handleSubmit = (data: {} = {}) => {
        createFunc(data);
        navigate();
      };
    return <OrderForm state={ENTITY_VIEW_STATES.create} onSubmit={handleSubmit} />
}