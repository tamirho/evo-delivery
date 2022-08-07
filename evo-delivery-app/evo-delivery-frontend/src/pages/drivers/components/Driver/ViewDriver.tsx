import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEntityId } from "../../../../hooks/use-entity-id";
import { ENTITY_VIEW_STATES } from "../../../common";
import { useDriver } from "../../hooks/use-driver";
import { EvoForm } from "../EvoForm";

export const ViewDriver = () => {
  const driverId = useEntityId() as string;
  const { data } = useDriver(driverId);
  const location = useLocation();
  const navigate = useNavigate();
  const goToEntity = useMemo(
    () => (id: string) =>
      navigate(`../${id}/${ENTITY_VIEW_STATES.edit}${location.search}`),
    []
  );

  const handleSubmit = () => {
    goToEntity(driverId);
  };

  return (
    <EvoForm
      disable={true}
      initialData={[
        { label: "id", type: "text", value: "12" },
        {
          label: "name",
          type: "text",
          value: "vladi",
        },
        {
          label: "Max Distance",
          type: "number",
          value: "100",
        },
        {
          label: "Max Capacity",
          type: "number",
          value: "220",
        },
      ]}
      handleSubmit={handleSubmit}
      buttonText="Edit"
    />
  );
};
