import { Driver } from "@backend/types";
import { Checkbox, TextField } from "@mui/material";
import * as React from "react";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEntityId } from "../../../../hooks/use-entity-id";
import { ENTITY_VIEW_STATES } from "../../../common";
import { useDriver } from "../../hooks/use-driver";
import { DriverData, DriverForm } from "../DriverForm";

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
    <DriverForm
      disable={true}
      data={{ id: "12", name: "vladi", maxDistance: 20, maxCapacity: 50 }}
      callback={handleSubmit}
      buttonText="Edit"
    />
  );
};
