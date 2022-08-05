import TextField from "@mui/material/TextField";
import { useForm } from "../../../hooks/use-form";

export type FormFieldAttr = {
  label: string;
  type: string;
  value: string;
};
type FormProps = {
  disable: boolean;
  initialData: FormFieldAttr[];
  callback: any;
  buttonText: string;
};

export const EvoForm = ({
  disable,
  initialData,
  callback,
  buttonText,
}: FormProps) => {
  const data = initialData?.reduce(
    (a, v) => ({ ...a, [v.label]: v.value }),
    {}
  );
  const { onChange, onSubmit, values } = useForm(callback, data);

  return (
    <>
      <form onSubmit={onSubmit}>
        {initialData?.map((field) => (
          <div>
            <TextField
              id="filled-number"
              name={field.label}
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
