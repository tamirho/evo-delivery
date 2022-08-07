import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetEntity } from "../../../../hooks/entities-api/use-get-entity";
import { useEntityId } from "../../../../hooks/router/use-entity-id";
import { ENTITY_VIEW_STATES } from "../../../common";
import { EvoForm } from "../EvoForm";

export const ViewDriver = () => {
  const driverId = useEntityId();
  const { data } = useGetEntity(driverId as string);
  const location = useLocation();
  const navigate = useNavigate();
  const goToEntity = useMemo(
    () => (id: string) =>
      navigate(`../${id}/${ENTITY_VIEW_STATES.edit}${location.search}`),
    []
  );

  const handleSubmit = () => {
    goToEntity(driverId as string);
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
