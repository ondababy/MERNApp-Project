import { Steps } from '@common';
import { useState } from 'react';
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

function UserOnboarding(props) {
  const [currentStep, setCurrentStep] = useState(0);
  const pageComponents = [<EmailVerificaiton />, <AccountInformation />];


  const handleContinue = () => {
    if (currentStep < initialSteps.length - 1) {
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
    <div className="flex flex-col items-start min-h-screen w-screen  px-4 lg:px-24 my-12">
      <Steps
        stepList={initialSteps}
        onChange={(index) => setCurrentStep(index - 1)}
        current={currentStep}
      />
      <div className="divider"></div>
      <div className="container w-full">{pageComponents[currentStep]}</div>
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
          {currentStep < initialSteps.length - 1 ? 'Continue' : 'Submit'}
        </button>
      </div>
    </div>
  );
}

export default UserOnboarding;

