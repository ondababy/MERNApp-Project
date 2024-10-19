import product_placeholder from "@assets/images/product_placeholder.webp"
import { Counter } from '@custom'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ShopWrapper from './Wrapper'

export default function Cart() {
  return (
    <ShopWrapper bannerText="SHOPPING CART" childClass="flex-col md:flex-row">
      <div className="p-8 container mx-auto border border-green-400">
        <h1 className='font-extrabold tracking-wider text-2xl uppercase'>
          Your Items
        </h1>

        {/* CARD */}
        <div className=" flex flex-col lg:min-h-96 lg:h-96 lg:flex-row items-center justify-between p-4 border border-gray-400">
          <div className="container flex flex-col lg:flex-row items-start">
            <img
              className="lg:w-2/5 aspect-square object-contain"
              src={product_placeholder}
              alt="product"
            />
            <div className="lg:w-2/5 flex flex-col">
              <div className="ml-4 my-8 text-lg">
                <h1 className="font-bold text-primary">
                  JBL Charge 5 Portable with Built-in Power bank Waterproof Speaker -
                </h1>

                <div className="flex text-sm gap-2">
                  <span className="text-gray-600">Price: </span>
                  <span className=" font-semibold"> PHP 1990.00</span>
                </div>
                <div className="flex text-sm gap-2">
                  <span className="text-gray-600">Quantity: </span>
                  <span className=" font-semibold"> 10</span>
                </div>



                <div className="flex text-sm gap-2">
                  <span className="text-gray-600">Item total: </span>
                  <span className=" font-semibold"> PHP 19900.00</span>
                </div>





              </div>

              <Counter />
            </div>

          </div>


          <button className="lg:h-full btn btn-ghost text-red-500 flex-1">Remove</button>
        </div>


      </div>

      <div className="min-h-96 p-8 container mx-auto md:max-w-sm border border-red-400">
        <h1 className='font-extrabold tracking-wider text-2xl uppercase'>
          Subtotal
        </h1>
        <div className="flex justify-between my-4">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">PHP 19900.00</span>
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

        <button className="btn btn-outline btn-primary w-full">Proceed to Checkout</button>
        <Link to="/" className="group flex gap-2 items-center my-4 hover:text-primary  transition-all ease-in">
          Continue Shopping
          <span className="group-hover:ml-8 transition-all ease-in">
            <FaArrowRight />
          </span>
        </Link>




      </div>

    </ShopWrapper>
  )
}
