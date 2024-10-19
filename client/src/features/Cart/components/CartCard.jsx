import { Counter } from '@custom';
import React from 'react';

const itemDefault = {
  id: -1,
  name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
  currency: "PHP",
  price: 0,
  quantity: 0,
  total: 0,
  image: "https://via.placeholder.com/600/",
}

export function CartCard({ item = itemDefault, ...props }) {

  const handleQuantity = (value) => { };
  const handleRemove = () => { };

  return item && (
    <div {...props} className="flex flex-col lg:min-h-64 lg:h-64 lg:flex-row items-center justify-between border border-gray-400">
      <div className="container flex flex-col lg:flex-row lg:items-start items-center ">
        <img
          className="w-1/2 lg:max-w-64 lg:w-2/5 aspect-square object-contain"
          src={item.image || "https://via.placeholder.com/150"}
          alt="product"
        />

        <div className="p-4 flex  lg:flex-1 flex-col">
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
  )
}
