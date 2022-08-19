import { useState } from "react";

export const useForm = (handleSubmit: any, initialData = {}) => {
  const [values, setValues] = useState(initialData);

  // onChange
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // onSubmit
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleSubmit(values); // triggering the callback
  };

  // return values
  return {
    onChange,
    onSubmit,
    values,
  };
};
