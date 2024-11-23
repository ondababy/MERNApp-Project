import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function OrderSummary({ order, onConfirm = () => { }, noConfirm = false }) {
  order = order || useSelector((state) => state.order);
  const [terms, setTerms] = useState(false);
  const { userInfo: user } = useSelector((state) => state.auth);


  return !order.items?.length ? '' : (
    <>
      <div className={`max-w-4xl bg-base-200 p-8 container mx-auto ${order?.completed ? '' : 'md:min-h-96  md:max-w-sm lg:border-r'}`}>
        <h1 className='font-extrabold tracking-wider text-2xl uppercase'>
          Order Summary
        </h1>
        <div className="divider"></div>

        {/* Customer Info */}
        <div className="flex justify-between my-4">
          <span>Customer Info</span>
        </div>
        <div className="flex justify-between my-4">
          <span className="text-gray-600">Name</span>
          <span className="">
            {user?.info?.first_name} {user?.info?.last_name}
          </span>
        </div>
        <div className="flex justify-between my-4">
          <span className="text-gray-600">Address</span>
          <span className="text-right">
            {!order?.completed &&
              (user?.info?.address + ', ' +
                user?.info?.city + ', ' +
                user?.info?.region + ', ' +
                user?.info?.zip_code).substring(0, 32) + '...'
            }
            {order?.completed &&
              (user?.info?.address + ', ' +
                user?.info?.city + ', ' +
                user?.info?.region + ', ' +
                user?.info?.zip_code)
            }
          </span>
        </div>

        <div className="flex justify-between my-4">
          <span className="text-gray-600">Contact</span>
          <span className="">
            {user?.info?.contact}
          </span>
        </div>
        <div className="flex justify-between my-4">
          <span className="text-gray-600"></span>
          <span className="">
            {user?.email}
          </span>
        </div>

        {/* Items */}
        <div className="flex justify-between my-4">
          <span>Items</span>
        </div>
        {
          order.items?.map((item, index) => (
            <div key={index} className="flex justify-between my-4">
              <span className="text-gray-600">{item?.product?.name?.substring(0, 15) + '...'} x {item?.quantity}</span>
              <span className="font-semibold">
                {order?.currency || ''} {item.price}
              </span>
            </div>
          ))
        }


        <div className="divider"></div>

        <div className="flex justify-between my-4">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">
            {order.items?.length && order?.currency || ''} {order?.subTotal || 0}
          </span>
        </div>

        <div className="flex justify-between my-4">
          <span className="text-gray-600">Shipping Fee</span>
          <span className="font-semibold">
            {order.items?.length && order?.currency || ''} {order?.shipping?.fee || 0}
          </span>
        </div>

        {/* <div className="flex justify-between my-4">
          <span className="text-gray-600">Tax Total</span>
          <span className="font-semibold">
            {order.items?.length && order?.currency || ''} {order?.taxTotal || 0}
          </span>
        </div> */}

        <div className="divider"></div>

        <div className="flex justify-between my-4 text-lg">
          <span className="text-gray-600 font-bold">Total</span>
          <span className="font-bold">
            {order.items?.length && order?.currency || ''} {order?.total || 0}
          </span>
        </div>


        <i className="text-xs font-light">
          *Taxes and shipping calculated at checkout
        </i>
        {/* Terms and Condition */}
        <div className="flex items-center my-4">
          <input onClick={e => setTerms(term => !term)} type="checkbox" className='checkbox checkbox-xs checkbox-primary' />
          <span className="text-xs ml-2">
            I agree with the terms and conditions
          </span>
        </div>

        <button
          onClick={onConfirm}
          className={`${!order.items?.length || !order?.completed || !terms ? 'btn-disabled' : ''} btn btn-outline btn-primary w-full`}>
          Confirm Order
        </button>
      </div>
    </>
  )
}
