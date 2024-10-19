import React from 'react'

import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { CartCard } from './CartCard'

const cartItems = Array(3).fill(
  {
    id: 1,
    name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    currency: "PHP",
    price: 1990.00,
    quantity: 10,
    total: 19900.00,
    image: "https://via.placeholder.com/600",
  }
)

export function CartSection() {
  return (
    <>
      <div className="bg-base-200/50 p-8 container mx-auto">
        <h1 className='font-extrabold tracking-wider text-2xl uppercase'>
          Your Items
        </h1>
        <div className="divider"></div>

        {/* CARD */}
        <div className="flex flex-col gap-4">

          {
            cartItems.map((item, index) => (
              <CartCard item={item} />
            ))
          }
        </div>



      </div>

      <div className="bg-base-200 min-h-96 p-8 container mx-auto md:max-w-sm border-l">
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
    </>
  )
}
