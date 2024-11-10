import React, { useEffect, useState } from 'react';
import { useOrderActions } from '../hooks/useOrderActions';
import { paymentMethods, shippingMethods } from '../order.slice';
import OrderWrapper from './OrderWrapper';

// ['pending', 'processing', 'shipped', 'delivered', 'cancelled']


export default function OrderView() {
  const { handleUpdate, fetchOrder } = useOrderActions({ action: 'edit' })
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder().then(order => {
      setOrder(order)
    });

  }, [])

  useEffect(() => {
    console.log(order);
  }, [order])



  return !order ? '' : <>
    <OrderWrapper title="Manage Order">
      <div className="flex justify-center">

        <div className="container max-w-6xl mx-auto">

          <span className='text-xs italic text-gray-500'>
            Order ID: {order.id}
          </span>
          <h1 className="font-bold text-xl">
            Order Summary
          </h1>
          <div className="divider"></div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Customer */}
            <div>
              <h2 className="text-lg font-light text-gray-400">
                Customer
              </h2>
              <div>

                <h3 className="font-bold text-xl">
                  {order.user.info.first_name} {order.user.info.last_name}
                </h3>
                <h3 className="font-bold text-md text-gray-400">
                  {order.user.username}
                </h3>
                <p className='text-gray-400 italic'>
                  {order.user.email}
                </p>
                <p>
                  {order.user.info.contact}
                </p>
                <p>
                  {order.user.info.city}, {order.user.info.region}
                </p>
              </div>
            </div>

            {/* Shipping */}
            <div>
              <h2 className="text-lg font-light text-gray-400">
                Shipping
              </h2>
              <div>

                <h3 className="font-bold text-xl">
                  {shippingMethods[order.shipping.method]?.method}
                </h3>
                <p>
                  {order.shipping.address}
                </p>
              </div>
            </div>
          </div>

          <div className="divider"></div>

        </div>
      </div>



    </OrderWrapper>



  </>;
}




