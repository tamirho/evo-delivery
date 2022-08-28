import { useFormContext } from 'react-hook-form';
import { Box, Button, Step, StepContent, StepLabel, Stepper } from '@mui/material';
import { SelectDepotStep, SelectDepotLabel } from '../nested-tabs/SelectDepotStep';
import { SelectDriversStep, SelectDriversLabel } from '../nested-tabs/SelectDriversStep';
import { SelectOrdersStep, SelectOrdersLabel } from '../nested-tabs/SelectOrdersStep';

import { createStepperHandlers } from './common';
import { countErrors } from '../common';
import { LetsCustomizeAlert, GoDefaultAlert, ErrorAlert } from './alerts';

const steps = [
  {
    label: 'Select Depot',
    optionalLabel: <SelectDepotLabel />,
    component: <SelectDepotStep />,
  },
  {
    label: 'Select Drivers',
    optionalLabel: <SelectDriversLabel />,
    component: <SelectDriversStep />,
  },
  {
    label: 'Select Orders',
    optionalLabel: <SelectOrdersLabel />,
    component: <SelectOrdersStep />,
  },
];

export type DataTabProps = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  letsCustomizeOnClickHandler: () => void;
};

export const DataTab = ({ activeStep, setActiveStep, letsCustomizeOnClickHandler }: DataTabProps) => {
  const { formState } = useFormContext();
  const { handleNext, handleBack } = createStepperHandlers(setActiveStep);

  const errorCount = countErrors(formState.errors);

  return (
    <>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel onClick={() => setActiveStep(index)} optional={activeStep !== index ? step.optionalLabel : null}>
              {step.label}
            </StepLabel>
            <StepContent>
              <Box sx={{ marginY: 3 }}>{step.component}</Box>
              <Box sx={{ marginY: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Back
                  </Button>
                  <Button variant='contained' onClick={handleNext} sx={{ mt: 1, mr: 1, borderRadius: 50 }}>
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                </Box>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && !errorCount.all && (
        <>
          <LetsCustomizeAlert onButtonClicked={letsCustomizeOnClickHandler} />
          <GoDefaultAlert disabled={!!errorCount.all} />
        </>
      )}
      {activeStep === steps.length && !!errorCount.all && <ErrorAlert />}
    </>
  );
};
