import { EvoForm } from "../EvoForm";

export const CreateDriver = () => {
  const callback = () => {
    //poseDriver
  };

  return (
    <EvoForm
      disable={true}
      callback={callback}
      initialData={[]}
      buttonText="Create"
    />
  );
};
