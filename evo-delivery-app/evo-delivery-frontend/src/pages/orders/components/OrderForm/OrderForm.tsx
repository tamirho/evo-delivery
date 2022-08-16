import React from "react";
import { useForm } from "react-hook-form";
import { Button, Stack, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { Order } from "@backend/types";
import { ENTITY_VIEW_STATES, FormStates } from "../../../common";
import { useGetLocation } from "../../hooks/use-get-location";
import { Location as LocationType } from "@backend/types";
export type OrderFormProps = {
  state: FormStates;
  onSubmit?: (
    data: any,
    event?: React.BaseSyntheticEvent
  ) => any | Promise<any>;
  order?: Order;
};

export const OrderForm = ({
  state,
  onSubmit = (data) => console.log(data),
  order,
}: OrderFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: order || ({} as Order), mode: "onChange" });

  const getLocation = useGetLocation();

  const validateAddress = (addr: string | undefined) => {
    if (!addr) return true;

    const res = getLocation(addr).then((res) => {
      setValue("latitude", res.latitude);
      setValue("longitude", res.longitude)
    });

    return true;
  };
  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={3}
      style={{ width: "100%", margin: 20 }}
    >
      {state !== ENTITY_VIEW_STATES.create ? (
        <TextField
          fullWidth
          id="order-id"
          label="ID"
          InputProps={{
            readOnly: true,
          }}
          disabled={true}
          variant="standard"
          {...register("_id")}
        />
      ) : null}

      <TextField
        type="text"
        id="filled-number"
        label="Address"
        InputProps={{
          readOnly: state === ENTITY_VIEW_STATES.view,
        }}
        variant="standard"
        {...register("address", {
          required: true,
          validate: { validAddress: validateAddress },
        })}
        error={errors.address ? true : false}
        helperText={
          errors.address && errors.address.type === "validAddress"
            ? "Address not found"
            : "Address is required"
        }
      />
      <TextField
        id="filled-number"
        label="Latitude"
        InputProps={{
          readOnly: true,
        }}
        variant="standard"
        type="number"
        {...register("latitude")}
      />

      <TextField
        id="filled-number"
        label="Longitude"
        InputProps={{
          readOnly: true,
        }}
        variant="standard"
        type="number"
        {...register("longitude")}
      />

      <TextField
        id="filled-number"
        label="Weight"
        InputProps={{
          readOnly: state === ENTITY_VIEW_STATES.view,
        }}
        variant="standard"
        type="number"
        {...register("weight", { required: true, min: 1 })}
        error={errors.weight ? true : false}
        helperText={errors.weight ? "Weight must be larger than zero" : ""}
      />

      <TextField
        id="filled-number"
        label="Shipping Date"
        InputProps={{
          readOnly: state === ENTITY_VIEW_STATES.view,
        }}
        variant="standard"
        type="date"
        defaultValue={""}
        {...register("shippingDate", { required: true })}
        error={errors.shippingDate ? true : false}
        helperText={errors.shippingDate ? "Shipping Date required" : ""}
      />
      {state !== ENTITY_VIEW_STATES.view ? (
        <Button
          type="submit"
          variant="contained"
          color="info"
          style={{ borderRadius: 50 }}
          startIcon={
            state === ENTITY_VIEW_STATES.edit ? <SaveIcon /> : <AddIcon />
          }
        >
          {state === ENTITY_VIEW_STATES.edit ? "Save" : "Create"}
        </Button>
      ) : (
        <Button
          type="submit"
          variant="contained"
          color="info"
          style={{ borderRadius: 50 }}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      )}
    </Stack>
  );
};
