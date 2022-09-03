export const createStepperHandlers = (setActiveStep: React.Dispatch<React.SetStateAction<number>>) => {
  const handleNext = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = (): void => {
    setActiveStep(0);
  };

  return { handleNext, handleBack, handleReset };
};
