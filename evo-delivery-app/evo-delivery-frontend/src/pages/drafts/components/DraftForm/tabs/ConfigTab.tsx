import { Box, Button, Step, StepContent, StepLabel, Stepper } from '@mui/material';
import { GeneralConfigLabel, GeneralConfigStep } from '../nested-tabs/GeneralConfigStep';
import { ComponentConfigStep, ComponentConfigLabel } from '../nested-tabs/ComponentConfigStep';
import { capitalize, toHumanReadableStr } from '../../../../../utils/string.utils';
import { createStepperHandlers } from './common';
import { useFormContext } from 'react-hook-form';

import { countErrors } from '../common';
import { ErrorAlert, WellDoneAlert } from './alerts';
import { EaComponentTypes } from '../../common';

export type ConfigTabProps = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

export const ConfigTab = ({ activeStep, setActiveStep }: ConfigTabProps) => {
  const { formState } = useFormContext();
  const { errors }: { errors: any } = formState;
  const { config: configErrors } = errors;
  const errorCount = countErrors(errors);

  const { handleNext, handleBack } = createStepperHandlers(setActiveStep);

  return (
    <>
      <Stepper activeStep={activeStep} orientation='vertical'>
        <Step key='generalConfigTab'>
          <StepLabel
            onClick={() => setActiveStep(0)}
            optional={activeStep !== 0 ? <GeneralConfigLabel /> : null}
            error={!!(configErrors?.popSize || configErrors?.crossoverProb || configErrors?.mutateProb)}
          >
            General
          </StepLabel>
          <StepContent>
            <GeneralConfigStep />
            <Box sx={{ marginY: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button disabled={true} sx={{ mt: 1, mr: 1 }}>
                  Back
                </Button>
                <Button variant='contained' onClick={handleNext} sx={{ mt: 1, mr: 1, borderRadius: 50 }}>
                  Continue
                </Button>
              </Box>
            </Box>
          </StepContent>
        </Step>
        {Object.values(EaComponentTypes).map((componentType, index, steps) => (
          <Step key={componentType}>
            <StepLabel
              onClick={() => setActiveStep(index + 1)}
              optional={activeStep !== index + 1 ? <ComponentConfigLabel componentType={componentType} /> : null}
              error={!!configErrors?.[componentType]}
            >
              {capitalize(toHumanReadableStr(componentType))}
            </StepLabel>
            <StepContent>
              <ComponentConfigStep componentType={componentType} />
              <Box sx={{ marginY: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button disabled={index + 1 === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Back
                  </Button>
                  <Button variant='contained' onClick={handleNext} sx={{ mt: 1, mr: 1, borderRadius: 50 }}>
                    {index + 1 === steps.length ? 'Finish' : 'Continue'}
                  </Button>
                </Box>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep > 5 && !errorCount.all && <WellDoneAlert />}
      {activeStep > 5 && !!errorCount.all && <ErrorAlert />}
    </>
  );
};
