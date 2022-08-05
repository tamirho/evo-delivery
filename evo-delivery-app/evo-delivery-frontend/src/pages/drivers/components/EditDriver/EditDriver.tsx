import { useEntityId } from "../../../../hooks/use-entity-id";
import { useDriver } from "../../hooks/use-driver";
import { DriverData, EvoForm } from "../DriverForm";

export const EditDriver = () => {
  const driverId = useEntityId() as string;
  const { data } = useDriver(driverId);

  const callback = (data: DriverData) => {
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
          value: 100,
        },
        {
          label: "Max Capacity",
          type: "number",
          value: 220,
        },
      ]}
      callback={callback}
      buttonText="Update"
    />
  );
};
