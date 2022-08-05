import TextField from "@mui/material/TextField";
import { useForm } from "../../../hooks/use-form";

export type DriverData = {
  id: string;
  name: string;
  maxDistance: number;
  maxCapacity: number;
};

type DriverFormProps = {
  disable: boolean;
  data?: DriverData;
  callback: any;
  buttonText: string;
};

export const DriverForm = ({
  disable,
  data,
  callback,
  buttonText,
}: DriverFormProps) => {
  const initialState = {
    id: data?.id,
    name: data?.name,
    maxDistance: data?.maxDistance,
    maxCapacity: data?.maxCapacity,
  };

  const { onChange, onSubmit, values } = useForm(callback, initialState);

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <TextField
            className="TextField"
            id="filled-number"
            label="Name"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            disabled={disable}
            defaultValue={data?.name}
            onChange={onChange}
          />
        </div>
        <></>
        <div>
          <TextField
            className="TextField"
            id="filled-number"
            label="Max Capacity"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            disabled={disable}
            defaultValue={data?.maxCapacity}
            onChange={onChange}
          />
        </div>
        <div>
          <TextField
            className="TextField"
            id="filled-number"
            label="Max Distance"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            disabled={disable}
            defaultValue={data?.maxDistance}
            onChange={onChange}
          />
        </div>
        <div>
          <button type="submit">{buttonText}</button>
        </div>
      </form>
    </>
  );
};
