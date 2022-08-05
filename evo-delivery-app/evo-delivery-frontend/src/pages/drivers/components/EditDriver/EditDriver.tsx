import * as React from "react";
import { useEntityId } from "../../../../hooks/use-entity-id";
import { useDriver } from "../../hooks/use-driver";
import { DriverData, DriverForm } from "../DriverForm";

export const EditDriver = () => {
  const driverId = useEntityId() as string;
  const { data } = useDriver(driverId);

  const callback = (data:DriverData) => {
    //updateDriver
    console.log(data)
  };

  return (
    <DriverForm
      disable={false}
      data={{ id: "12", name: "vladi", maxDistance: 20, maxCapacity: 50 }}
      callback={callback}
      buttonText="Update"
    />
  );
};
