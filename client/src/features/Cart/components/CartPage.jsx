import { confirmDelete } from '@custom';
import { useEffect, useRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCartActions } from '../hooks/useCartActions';
import CartList from './CartList';

export function CartPage() {
  const [checkoutReady, setCheckoutReady] = useState(false);
  const terms = useRef(null);
  const {
    cart: { items, subTotal },
    getItems,
    removeItem,

  } = useCartActions()


  const handleRemove = async (cartItem) => {
    confirmDelete(() => {
      removeItem(cartItem).then(() => {
        getItems();
      })
    });
  }

  const handleTerms = () => {
    setCheckoutReady(terms.current.checked && items?.length);
  }

  useEffect(() => {
    setCheckoutReady(terms.current.checked && items?.length);
  }, [items])




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
          <input
            ref={terms}
            onChange={handleTerms}
            className="checkbox h-4 w-4 text-primary"
            type="checkbox"

          />
          <span className="text-xs ml-2">
            I agree with the terms and conditions
          </span>
        </div>

        <Link to="/checkout" className={`${!checkoutReady ? 'btn-disabled' : ''} btn btn-outline btn-primary w-full`}>
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
