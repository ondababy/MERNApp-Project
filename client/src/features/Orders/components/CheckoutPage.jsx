import React from 'react';
import CheckoutSteps from './CheckoutSteps';
const items = [];
const subTotal = 0;

export default function CheckoutPage() {
  return (
    <>
      <CheckoutSteps />

      <div className="bg-base-200 md:min-h-96 p-8 container mx-auto md:max-w-sm border-l">
        <h1 className='font-extrabold tracking-wider text-2xl uppercase'>
          Order Summary
        </h1>
        <div className="divider"></div>


        <div className="flex justify-between my-4">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">
            {items?.length && items[0]?.currency || ''} {subTotal}
          </span>
        </div>

        <div className="flex justify-between my-4">
          <span className="text-gray-600">Shipping Fee</span>
          <span className="font-semibold">
            {items?.length && items[0]?.currency || ''} {subTotal}
          </span>
        </div>

        <div className="flex justify-between my-4">
          <span className="text-gray-600">Tax Total</span>
          <span className="font-semibold">
            {items?.length && items[0]?.currency || ''} {subTotal}
          </span>
        </div>

        <div className="divider"></div>

        <div className="flex justify-between my-4 text-lg">
          <span className="text-gray-600 font-bold">Total</span>
          <span className="font-bold">
            {items?.length && items[0]?.currency || ''} {subTotal}
          </span>
        </div>


        <i className="text-xs font-light">
          *Taxes and shipping calculated at checkout
        </i>
        {/* Terms and Condition */}
        <div className="flex items-center my-4">
          <input type="checkbox" />
          <span className="text-xs ml-2">
            I agree with the terms and conditions
          </span>
        </div>

        <button className={`${!items?.length ? 'btn-disabled' : ''} btn btn-outline btn-primary w-full`}>
          Confirm Order
        </button>





      </div>
    </>
  )
}
