import { useCreateEntity } from '../../../../hooks/entities-api/use-create-entity';
import { useNavigateToParent } from '../../../../hooks/router/use-navigate-to-parent';
import { ENTITY_VIEW_STATES } from '../../../common';
import { DepotForm } from '../DepotForm/DepotForm';

export const CreateDepot = () => {
   const navigate = useNavigateToParent();
   const createFunc = useCreateEntity();

   const handleSubmit = (data: {} = {}) => {
     createFunc(data);
     navigate();
   };

   return (
     <DepotForm onSubmit={handleSubmit} state={ENTITY_VIEW_STATES.create} />
   );
}