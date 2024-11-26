import { cn } from "@common/lib/utils";
import { Counter } from '@custom';
import React from 'react';
import { Link } from 'react-router-dom';
import { useCartActions } from '../hooks/useCartActions';

const itemDefault = {
  id: -1,
  product: {
    name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    currency: "PHP",
    price: 0,
  },
  quantity: 0,
  total: 0,
}

export function CartCard({ item = itemDefault, onRemove = () => { }, onSelect = () => { }, className, ...props }) {
  const [product, setProduct] = React.useState(item?.product || itemDefault.product);
  const [cartItem, setCartItem] = React.useState(item || itemDefault);
  const { updateItem } = useCartActions();
  const handleQuantity = (value) => {
    const payload = {
      id: cartItem.id,
      product: product.id,
      quantity: value,
      total: (product.price * value).toFixed(2),
    }
    updateItem(payload).then((updatedItem) => {
      setCartItem((prev) => ({
        ...prev,
        quantity: updatedItem.quantity,
        total: updatedItem.total,
      }));
    });

  };

  const handlRemove = () => {
    onRemove(cartItem)
  }


  return cartItem && cartItem.id != -1 && (
    <div {...props} className={cn("flex flex-col lg:min-h-64 lg:h-64 lg:flex-row items-center justify-between border border-gray-400", className)}>
      <div className="container flex flex-col lg:flex-row lg:items-start items-center ">
        <img
          className="w-1/2 lg:max-w-64 lg:w-2/5 aspect-square object-contain"
          src={product.image || "https://placehold.co/150"}
          alt="product"
        />

        <div className="p-4 flex  lg:flex-1 flex-col">
          <div className="ml-4 my-8 text-lg">
            <Link to={`/shop/${product.slug}`} className="group">
              <h1 className="font-bold text-primary group-hover:link transition-all ease-in">
                {product.name} {product.selected}
              </h1>
            </Link>
            <div className="flex text-sm gap-2">
              <span className="text-gray-600">Price: </span>
              <span className=" font-semibold">
                {product.currency || 'PHP'} {product?.price?.toFixed(2) || 0}
              </span>
            </div>
            <div className="flex text-sm gap-2">
              <span className="text-gray-600">Quantity: </span>
              <span className=" font-semibold">
                {cartItem.quantity}
              </span>
            </div>
            <div className="flex text-sm gap-2">
              <span className="text-gray-600">Item total: </span>
              <span className=" font-semibold">
                {product.currency || 'PHP'} {cartItem.total}
              </span>
            </div>
          </div>

          <Counter
            count={cartItem.quantity}
            onChange={handleQuantity}
            max={product.stock}
          />
        </div>
      </div>
      <div className="flex lg:flex-col items-center w-full lg:w-fit lg:h-full">
        <button
          onClick={onSelect}
          className="rounded-none btn btn-ghost w-full flex-1">
          Select
        </button>

        <button
          onClick={handlRemove}
          className="rounded-none btn btn-ghost text-red-500 w-full flex-1">
          Remove
        </button>
      </div>
    </div>
  )
}
