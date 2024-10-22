import { Steps } from '@common';
import { Card, CardContent } from "@common/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@common/components/ui/carousel";

import React from 'react';
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
  const [currentStep, setCurrentStep] = React.useState(0);
  const [api, setApi] = React.useState();


  const handleContinue = () => {
    if (currentStep < initialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinished = () => {
    console.log('Order finish');
  }


  React.useEffect(() => {
    if (!api) {
      return;
    }
  }, [api]);

  return (
    <div className="flex flex-col min-h-96 bg-base-200/50 p-8 container mx-auto h-screen">
      <h1 className='font-extrabold tracking-wider text-2xl uppercase'>
        Order Process
      </h1>
      <div className="divider"></div>

      {/* STEP COMPONENT */}
      <Steps
        stepList={initialSteps}
        onChange={(index) => setCurrentStep(index - 1)}
        current={currentStep}
      />




      {/* ACTIONS */}
      <div className="flex items-center justify-end gap-4 mt-auto">
        {
          currentStep > 0 && (
            <button className="btn btn-outline" onClick={handleBack}>
              Back
            </button>
          )
        }

        {
          currentStep < initialSteps.length - 1 && (
            <button className=" btn btn-outline btn-primary" onClick={handleContinue}>
              Continue
            </button>
          )
        }

        {
          currentStep === initialSteps.length - 1 && (
            <button
              onClick={handleFinished}
              className="  btn btn-outline btn-success">
              Finish
            </button>
          )
        }
      </div>




      {/* CAROUSEL CONTENT */}
      {/* <Carousel
        className="w-full h-full"
        setApi={setApi}
      >
        <CarouselContent className="h-full">
          {Array.from({ length: initialSteps.length }).map((_, index) => (
            <CarouselItem key={index} >
              <div className="p-1 h-full">
                <Card className="h-full">
                  <CardContent className=" flex items-center justify-center p-6">
                    <span className=" text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel> */}
    </div >
  )
}

