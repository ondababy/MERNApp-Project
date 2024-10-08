import { Steps } from '@common';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AccountInformation from './AccountInformation';
import EmailVerificaiton from './EmailVerification';

const initialSteps = [
  {
    label: 'Email Verification',
    isDone: false,
    isActive: false,
  },
  {
    label: 'Profile Setup',
    isDone: false,
    isActive: true,
  },
];

function AuthOnboarding(props) {
  const [currentStep, setCurrentStep] = useState(0);
  const pageComponents = [<EmailVerificaiton />, <AccountInformation />];

  const steps = initialSteps.map((step, index) => ({
    ...step,
    isDone: index < currentStep,
    isActive: index === currentStep,
  }));

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Form submitted');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex flex-col items-start h-full w-full">
      <Steps content={steps} />
      <div className="divider"></div>
      <div className="container">{pageComponents[currentStep]}</div>
      <div className="divider"></div>
      <div className="flex justify-between items-end w-full">
        {currentStep > 0 && (
          <button
            className="btn btn-secondary"
            onClick={handleBack}
          >
            Back
          </button>
        )}
        <button
          className="btn btn-primary"
          onClick={handleContinue}
        >
          {currentStep < steps.length - 1 ? 'Continue' : 'Submit'}
        </button>
      </div>
    </div>
  );
}

export default AuthOnboarding;

