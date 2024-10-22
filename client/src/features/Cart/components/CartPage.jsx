import { confirmDelete } from '@custom';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCartActions } from '../hooks/useCartActions';
import CartList from './CartList';

export function CartPage() {
  const {
    items,
    subTotal,
    getItems,
    removeItem,

  } = useCartActions()

  React.useEffect(() => {
    getItems();
  }, []);

  const handleRemove = async (cartItem) => {
    confirmDelete(() => {
      removeItem(cartItem).then(() => {
        Swal.fire({
          title: 'Success',
          text: 'Item removed successfully.',
          icon: 'success',
        });
        getItems();
      })
    });

  }




  return (
    <>
      <CartList cartItems={items} onRemove={handleRemove} />

      <div className="bg-base-200 lg:min-h-96 p-8 container mx-auto md:max-w-sm border-l">
        <h1 className='font-extrabold tracking-wider text-2xl uppercase'>
          Subtotal
        </h1>
        <div className="flex justify-between my-4">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">
            {items.length && items[0]?.currency || ''} {subTotal}
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

        <Link to="/checkout" className={`${!items?.length ? 'btn-disabled' : ''} btn btn-outline btn-primary w-full`}>
          Proceed to Checkout
        </Link>
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
