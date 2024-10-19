import { Counter } from '@custom';
import React from 'react';

const itemDefault = {
  id: 1,
  name: "JBL Charge 5 Portable with Built-in Power bank Waterproof Speaker",
  currency: "PHP",
  price: 1990.00,
  quantity: 10,
  total: 19900.00,
  image: "https://via.placeholder.com/150",
}

export function CartCard({ item = itemDefault }) {

  const handleQuantity = (value) => { };
  const handleRemove = () => { };




  return <>
    <div className=" flex flex-col lg:min-h-96 lg:h-96 lg:flex-row items-center justify-between p-4 border border-gray-400">
      <div className="container flex flex-col lg:flex-row items-start">
        <img
          className="lg:w-2/5 aspect-square object-contain"
          src={item.image || "https://via.placeholder.com/150"}
          alt="product"
        />
        <div className="lg:w-2/5 flex flex-col">
          <div className="ml-4 my-8 text-lg">
            <h1 className="font-bold text-primary">
              {item.name}
            </h1>
            <div className="flex text-sm gap-2">
              <span className="text-gray-600">Price: </span>
              <span className=" font-semibold">
                {item.currency} {item.price}
              </span>
            </div>
            <div className="flex text-sm gap-2">
              <span className="text-gray-600">Quantity: </span>
              <span className=" font-semibold">
                {item.quantity}
              </span>
            </div>
            <div className="flex text-sm gap-2">
              <span className="text-gray-600">Item total: </span>
              <span className=" font-semibold">
                {item.currency} {item.total}
              </span>
            </div>
          </div>

          <Counter
            onClick={handleQuantity}
          />
        </div>
      </div>

      <button
        onClick={handleRemove}
        className="lg:h-full btn btn-ghost text-red-500 flex-1">
        Remove
      </button>
    </div>

  </>;
}
