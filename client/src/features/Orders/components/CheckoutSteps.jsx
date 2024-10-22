import { Steps } from '@common';
import { useState } from 'react';

const initialSteps = [
  {
    label: 'Fill up information',
    isActive: true,
  },
  {
    label: 'Choose shipping method',
  },
  {
    label: 'Provide information',
  },
];

export default function CheckoutSteps() {
  const [currentStep, setCurrentStep] = useState(0);


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
    <div className="min-h-96 bg-base-200/50 p-8 container mx-auto">
      <h1 className='font-extrabold tracking-wider text-2xl uppercase'>
        Order Process
      </h1>
      <div className="divider"></div>

      {/* Something Stepper Here */}
      <Steps
        stepList={initialSteps}
        onChange={(index) => setCurrentStep(index - 1)}
        current={currentStep}
      />




    </div >
  )
}
