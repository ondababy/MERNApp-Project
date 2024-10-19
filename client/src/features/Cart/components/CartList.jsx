import React from 'react'

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

export default function CartList() {
  return (
    <div className="bg-base-200/50 p-8 container mx-auto">
      <h1 className='font-extrabold tracking-wider text-2xl uppercase'>
        Your Items
      </h1>
      <div className="divider"></div>

      <div className="flex flex-col gap-4">
        {
          cartItems.map((item, index) => (
            <CartCard key={index} item={item} />
          ))
        }
      </div>
    </div>

  )
}
