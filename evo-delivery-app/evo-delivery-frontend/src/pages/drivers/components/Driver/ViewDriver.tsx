<<<<<<< HEAD
=======
import { Driver } from "@backend/types";
import { Checkbox, TextField } from "@mui/material";
import * as React from "react";
>>>>>>> dd20954e0af34ce28a6e734b6fa82d8b581d2f56
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEntityId } from "../../../../hooks/use-entity-id";
import { ENTITY_VIEW_STATES } from "../../../common";
import { useDriver } from "../../hooks/use-driver";
<<<<<<< HEAD
import { EvoForm } from "../EvoForm";
=======
import { DriverData, DriverForm } from "../DriverForm";
>>>>>>> dd20954e0af34ce28a6e734b6fa82d8b581d2f56

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
<<<<<<< HEAD
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
=======
    <DriverForm
      disable={true}
      data={{ id: "12", name: "vladi", maxDistance: 20, maxCapacity: 50 }}
>>>>>>> dd20954e0af34ce28a6e734b6fa82d8b581d2f56
      callback={handleSubmit}
      buttonText="Edit"
    />
  );
};
