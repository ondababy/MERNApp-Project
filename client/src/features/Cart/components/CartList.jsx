import React from 'react'

import { CartCard } from './CartCard'


export default function CartList({ cartItems = [] }) {
  return (
    <div className="bg-base-200/50 p-8 container mx-auto">
      <h1 className='font-extrabold tracking-wider text-2xl uppercase'>
        Your Items
      </h1>
      <div className="divider"></div>

      <div className="flex flex-col gap-4">
        {
          cartItems?.length && cartItems.map((item, index) => (
            <CartCard key={index} item={item} />
          ))
        }
      </div>
    </div>

  )
}
