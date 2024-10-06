import { Steps } from '@common';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

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
  {
    label: 'Account Setup',
    isDone: false,
    isActive: false,
  },
];

function AuthOnboarding(props) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = initialSteps.map((step, index) => ({
    ...step,
    isDone: index < currentStep,
    isActive: index === currentStep,
  }));

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle form submission here
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
      <div className="border p-4 my-8 w-full">
        <div className="">form component here</div>
      </div>
      <div className="divider"></div>
      <div className="flex justify-between w-full">
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

AuthOnboarding.propTypes = {};

export default AuthOnboarding;

