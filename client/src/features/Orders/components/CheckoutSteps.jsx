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
import { useOrderActions } from '../hooks/useOrderActions';
import { setCompleted } from '../order.slice.js';

import CheckoutShipping from './CheckoutShipping';
import OrderSummary from './OrderSummary.jsx';

const initialSteps = [
  { label: 'Cart', isActive: true, },
  { label: 'Order Info', },
  { label: 'Shipping', },
  { label: 'Payment', },
  { label: 'Complete', },
];
export default function CheckoutSteps() {
  /* DECLARATIONS #################################################### */
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [api, setApi] = useState();
  const { order, handleShipping, handleCheckout } = useOrderActions({ render: true })
  const { selectedIds } = useSelector((state) => state.cart);
  const { userInfo, isChanging } = useSelector((state) => state.auth);

  // Step rules
  const rules = {
    0: {
      condition: order.items.length,
      message: 'Please add items to your cart!',
    },
    1: {
      condition: !isChanging,
      message: 'Please fill out the form and save the changes!',
    },
    2: {
      condition: order?.shipping?.method,
      message: 'Please choose a shipping method!',
    },
    3: {
      condition: order?.payment?.method,
      message: 'Please choose a payment method!',
    },
  }

  /* END DECLARATIONS ################################################ */
  const handleStepClick = (index) => {
    if (!rules[currentStep]) return setCurrentStep(0);
    if (!rules[currentStep]?.condition) {
      toast.error(rules[currentStep].message);
      return;
    }

    setCurrentStep(index - 1);
    api && api.scrollTo(index - 1);
  }

  const handleContinue = () => {
    if (!rules[currentStep]) return setCurrentStep(0);
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
    <OrderSummary onConfirm={handleCheckout} />,
  ]

  useEffect(() => {
    let quickStep = 0;
    for (let i = 0; i < Object.keys(rules).length; i++) {
      if (!rules[i]?.condition) {
        i > 1 && toast.error(rules[i]?.message);
        break;
      }
      quickStep++;
    }

    setCurrentStep(quickStep);
    api && api.scrollTo(quickStep);


  }, [userInfo, api]);

  useEffect(() => {
    if (currentStep == pageComponents.length - 1)
      dispatch(setCompleted(true));
    else
      dispatch(setCompleted(false));
  }, [currentStep]);

  return (
    <div className="flex flex-col min-h-96 bg-base-200/50 p-8 container mx-auto max-h-[200%]">
      <h1 className='font-extrabold tracking-wider text-2xl uppercase'>
        Order Process
      </h1>
      <div className="divider"></div>

      {/* ACTIONS */}
      <div className="flex items-center justify-between gap-4 mt-auto">
        {
          currentStep > 0 && (
            <button className="btn btn-ghost" onClick={handleBack}>
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

      </div>

      {/* STEP COMPONENT */}
      <Steps
        stepList={initialSteps}
        onChange={handleStepClick}
        current={currentStep}
      />


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

