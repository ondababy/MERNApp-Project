import { Steps } from '@common';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
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
  const nav = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(userInfo?.emailVerifiedAt && userInfo?.info);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handleStepClick = (index) => {
    if (index - 1 < currentStep) {
      setCurrentStep(index - 1);
    } else if (index - 1 > currentStep) {
      toast.error('Please complete the current step!');
    }

  }
  const handleContinue = () => {
    if (currentStep < initialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.success('Congratulations! You are all set up.');
      nav('/');

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


  return isFinished ? <Navigate to="/" /> : (
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

