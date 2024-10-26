import { Steps } from '@common';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@common/components/ui/carousel";
import { CartList, UserForm, getInfoFields } from "@features";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setShipping } from '../order.slice.js';

import CheckoutShipping from './CheckoutShipping';


export default function CheckoutSteps({ onFinish = () => { } }) {
  const dispatch = useDispatch();
  const { shipping, payment } = useSelector((state) => state.order);
  const { selectedIds } = useSelector((state) => state.cart);
  const { userInfo, isChanging } = useSelector((state) => state.auth);
  /* DECLARATIONS #################################################### */
  const initialSteps = [
    { label: 'Cart', isActive: true, },
    { label: 'Order Info', },
    { label: 'Shipping', },
    { label: 'Payment', },
    { label: 'Complete', },
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [api, setApi] = useState();
  // Step rules
  const rules = {
    0: {
      condition: selectedIds.length,
      message: 'Please add items to your cart!',
    },
    1: {
      condition: !isChanging,
      message: 'Please fill out the form and save the changes!',
    },
    2: {
      condition: shipping?.method,
      message: 'Please choose a shipping method!',
    },
    3: {
      condition: payment?.method,
      message: 'Please choose a payment method!',
    },
  }

  /* END DECLARATIONS ################################################ */
  const handleStepClick = (index) => {
    if (rules[index - 1] && !rules[index - 1]?.condition) {
      rules[index - 1] && toast.error(rules[index - 1]?.message);
      return;
    }
    setCurrentStep(index - 1);
    api && api.scrollTo(index - 1);
  }

  const handleContinue = () => {
    if (!rules[currentStep]?.condition) {
      toast.error(rules[currentStep].message);
      return;
    }

    if (currentStep < initialSteps.length - 1) {
      api && api.scrollTo(currentStep + 1);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    console.log(currentStep)
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      api && api.scrollTo(currentStep - 1);
    }
  };

  const handleFinished = () => {
    onFinish();
  }

  const handleShipping = (shipping) => {
    dispatch(setShipping(shipping));
  }

  useEffect(() => {
    if (!api) {
      return;
    }
  }, [api]);


  const pageComponents = [
    <CartList />,
    <UserForm noAvatar={true} id={userInfo.id} action="edit" fields={getInfoFields()} altFields={getInfoFields()} />,
    <CheckoutShipping onSelect={handleShipping} />,
    <>Choose payment method</>,
    <>Finish</>,
  ]

  useEffect(() => {
    Object.entries(rules).map(([index, rule]) => {
      if (!rule.condition) {
        toast.error(rule.message);
        return;
      }
      setCurrentStep(index == 3 ? parseInt(index) + 1 : parseInt(index));
      api && api.scrollTo(index == 3 ? parseInt(index) + 1 : parseInt(index));
    })

  }, [userInfo]);

  return (
    <div className="flex flex-col min-h-96 bg-base-200/50 p-8 container mx-auto max-h-[200%]">
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


      {/* ACTIONS */}
      <div className="flex items-center justify-between gap-4 mt-auto">
        {
          currentStep > 0 && (
            <button className="btn btn-outline" onClick={handleBack}>
              Back
            </button>
          )
        }

        {
          currentStep < initialSteps.length - 1 && (
            <button className="ml-auto btn btn-outline btn-primary" onClick={handleContinue}>
              Continue
            </button>
          )
        }

        {
          currentStep === initialSteps.length - 1 && (
            <button
              onClick={handleFinished}
              className="ml-auto btn btn-outline btn-success">
              Finish
            </button>
          )
        }
      </div>

      {/* CAROUSEL CONTENT */}
      <Carousel
        className="w-full h-full overflow-y-auto"
        opts={{ watchDrag: false }}
        setApi={setApi}
      >
        <CarouselContent className="h-full ">
          {pageComponents.map((page, index) => (
            <CarouselItem key={`${initialSteps[index]?.label}_${index}`} >
              <div className="p-1 h-full overflow-y-auto">
                {page}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

    </div >
  )
}

