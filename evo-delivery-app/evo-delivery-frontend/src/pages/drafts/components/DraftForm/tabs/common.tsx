export const createStepperHandlers = (setActiveStep: React.Dispatch<React.SetStateAction<number>>) => {
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return { handleNext, handleBack, handleReset };
};
