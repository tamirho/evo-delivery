import { Depot } from "@backend/types/depot.type";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useGetLocation } from "../../../../hooks/locations-api/use-get-location";
import { useFocusLocation } from "../../../../hooks/map/use-focus-location";
import { ENTITY_VIEW_STATES, FormStates } from "../../../common";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";

export type DepotFormProps = {
  state: FormStates;
  onSubmit?: (
    data: any,
    event?: React.BaseSyntheticEvent
  ) => any | Promise<any>;
  depot?: Depot;
};

export const DepotForm = ({
  state,
  onSubmit = (data) => console.log(data),
  depot,
}: DepotFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: depot || ({} as Depot), mode: "onChange" });

  const getLocationApi = useGetLocation();
  const focusLocation = useFocusLocation();

  const validateAddress = async (addr: string | undefined) => {
    if (!addr) return true;

    const { latitude, longitude } = await getLocationApi.byAddress(addr);

    setValue("latitude", latitude);
    setValue("longitude", longitude);
    focusLocation({ latitude, longitude });

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
          id="depot-id"
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
        label="Name"
        InputProps={{
          readOnly: state === ENTITY_VIEW_STATES.view,
        }}
        variant="standard"
        {...register("name", {
          required: true,
        })}
        error={errors.name ? true : false}
        helperText={errors.name ? "Depot name required" : ""}
      />
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
