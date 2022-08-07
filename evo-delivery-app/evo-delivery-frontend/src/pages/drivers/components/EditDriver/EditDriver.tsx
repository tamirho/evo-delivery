import { useGetEntity } from "../../../../hooks/entities-api/use-get-entity";
import { useEntityId } from "../../../../hooks/router/use-entity-id";
import { EvoForm, FormFieldAttr } from "../EvoForm";

export const EditDriver = () => {
  const driverId = useEntityId() as string;
  const { data } = useGetEntity(driverId)


  const handleSubmit = (data = {}) => {
    //updateDriver
    console.log(data);
  };

  return (
    <EvoForm
      disable={false}
      initialData={[
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
      buttonText="Update"
    />
  );
};
