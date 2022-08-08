import { EvoForm } from "../EvoForm";

export const CreateDriver = () => {
  const handleSubmit = () => {
    //poseDriver
  };

  return (
    <EvoForm
      disable={true}
      handleSubmit={handleSubmit}
      initialData={[]}
      buttonText="Create"
    />
  );
};
