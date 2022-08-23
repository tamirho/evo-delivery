import { useCreateEntity } from "../../../../hooks/entities-api/use-create-entity";
import { useNavigateToParent } from "../../../../hooks/router/use-navigate-to-parent";
import { ENTITY_VIEW_STATES } from "../../../common";
import { DriverForm } from "../DriverForm/DriverForm";

export const CreateDriver = () => {
  const navigate = useNavigateToParent();
  const createFunc = useCreateEntity();
  
  const handleSubmit = (data :{} = {}) => {
    createFunc(data);
    navigate();
  };

  return (
    <DriverForm onSubmit={handleSubmit} state={ENTITY_VIEW_STATES.create} />
  );

};
