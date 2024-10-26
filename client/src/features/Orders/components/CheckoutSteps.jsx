import { Steps } from '@common';
import { Card, CardContent } from "@common/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@common/components/ui/carousel";

import React from 'react';
import { toast } from 'react-toastify';


export default function CheckoutSteps({ onFinish = () => { } }) {
  /* DECLARATIONS #################################################### */
  const initialSteps = [
    { label: 'Fill up information', isActive: true, },
    { label: 'Choose shipping method', },
    { label: 'Confirm Items', },
  ];

  const pageComponents = [
    <>Fill up information</>,
    <>Choose shipping method</>,
    <>Confirm Items</>,
  ]

  const [currentStep, setCurrentStep] = React.useState(0);
  const [api, setApi] = React.useState();
  /* END DECLARATIONS ################################################ */


  const handleStepClick = (index) => {
    if (index - 1 < currentStep) {
      setCurrentStep(index - 1);
      api && api.scrollTo(index - 1);
    } else if (index - 1 > currentStep) {
      toast.error('Please complete the current step!');
    }
  }

  const handleContinue = () => {
    if (currentStep < initialSteps.length - 1) {
      api && api.scrollTo(currentStep + 1);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      api && api.scrollTo(currentStep - 1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinished = () => {
    onFinish();
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
        onChange={handleStepClick}
        current={currentStep}
      />


      {/* CAROUSEL CONTENT */}
      <Carousel
        className="w-full h-full"
        opts={{ watchDrag: false }}
        setApi={setApi}
      >
        <CarouselContent className="h-full">
          {pageComponents.map((page, index) => (
            <CarouselItem key={index} >
              <div className="p-1 h-full">
                <Card className="h-full">
                  <CardContent className=" flex items-center justify-center p-6">
                    {page}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

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
    </div >
  )
}

