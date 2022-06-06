import React, { useEffect, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  MobileStepper,
} from "@material-ui/core";
import Container from "../components/stepper/Container";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
const ResumeCreator = () => {
  const [step, setStep] = useState(0);
  const steps = [
    "مشخصات",
    "تحصیلات",
    "زبان های خارجی",
    "سابقه کار",
    "مهارت ها",
    "بازبینی",
  ];
  return (
    <>
      <Container step={step} />
      <MobileStepper
        variant="progress"
        steps={steps.length}
        position="static"
        activeStep={step}
        nextButton={
          step === steps.length - 1 ? (
            <Button color="secondary" size="small">
              ثبت و خروج
            </Button>
          ) : (
            <Button
              size="small"
              color="secondary"
              onClick={() => setStep(step + 1)}
              disabled={step === steps.length - 1}
            >
              بعدی
            </Button>
          )
        }
        backButton={
          <Button
            size="small"
            color="secondary"
            onClick={() => setStep(step - 1)}
            disabled={step === 0}
          >
            قبلی
          </Button>
        }
      />
    </>
  );
};

export default ResumeCreator;
