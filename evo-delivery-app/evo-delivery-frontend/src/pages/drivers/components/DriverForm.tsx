import TextField from "@mui/material/TextField";
import { useForm } from "../../../hooks/use-form";

export type DriverData = {
  id: string;
  name: string;
  maxDistance: number;
  maxCapacity: number;
};

export type FormFieldAttr = {
  label: string;
  type: string;
  value: string | number;
};
type FormProps = {
  disable: boolean;
  initialData?: FormFieldAttr[];
  callback: any;
  buttonText: string;
};

export const EvoForm = ({
  disable,
  initialData,
  callback,
  buttonText,
}: FormProps) => {
  const { onChange, onSubmit, values } = useForm(callback, initialData);

  return (
    <>
      <form onSubmit={onSubmit}>
        {initialData?.map((field) => (
          <div>
            <TextField
              id="filled-number"
              label={field.label}
              type={field.type}
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              disabled={disable}
              defaultValue={field.value}
              onChange={onChange}
            />
          </div>
        ))}
        <div>
          <button type="submit">{buttonText}</button>
        </div>
      </form>
    </>
  );
};
