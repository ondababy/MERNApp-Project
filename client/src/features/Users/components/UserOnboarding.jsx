import { Steps } from '@common';
import { useState } from 'react';
import { toast } from 'react-toastify';
import AccountInformation from './UserAccountInformation';
import EmailVerification from './UserEmailVerification';

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

function UserOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);


  const handleStepClick = (index) => {
    if (index < currentStep) {
      setCurrentStep(index);
    } else {
      toast.error('Please complete the current step!');
    }

  }


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

  const handleSave = (user) => {
    setIsEmailVerified(user?.emailVerifiedAt);
    setIsFinished(user?.emailVerifiedAt && user?.info);
  }

  const pageComponents = [<EmailVerification onSave={handleSave} />, <AccountInformation onSave={handleSave} />];


  return (
    <div className="flex flex-col items-start min-h-screen w-full max-w-6xl mx-auto  px-4 lg:px-24 my-12">
      <div>
        <Steps
          stepList={initialSteps}
          onChange={handleStepClick}
          current={currentStep}
        />
      </div>
      <div className="divider"></div>
      {pageComponents[currentStep]}
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
        {currentStep < initialSteps.length - 1 ? <button
          className="btn btn-primary"
          onClick={handleContinue}
          disabled={!isEmailVerified}

        >
          Continue
        </button> :
          <button
            className="btn btn-primary"
            onClick={handleContinue}
            disabled={!isFinished}
          >
            Finish
          </button>}
      </div>
    </div >
  );
}

export default UserOnboarding;

