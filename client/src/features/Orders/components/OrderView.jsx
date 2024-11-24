import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useOrderActions } from '../hooks/useOrderActions';
import { paymentMethods, shippingMethods } from '../order.slice';
import OrderWrapper from './OrderWrapper';

// ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

const badgeColor = {
  pending: 'bg-yellow-500',
  processing: 'bg-blue-500',
  shipped: 'bg-green-500',
  delivered: 'bg-green-500',
  cancelled: 'bg-red-500',
}


const ProcessButton = ({ order, handleUpdate }) => {
  let payload = {
    user: order?.user?._id,
    order
  }


  switch (order?.status) {
    case 'pending':
      return <button className='btn btn-primary' onClick={() => handleUpdate({ ...payload, status: 'processing' })}>Process Order</button>

    case 'processing':
      return <button className='btn btn-info' onClick={() => handleUpdate({ ...payload, status: 'shipped' })}>Ship Order</button>

    case 'shipped':
      return <button className='btn btn-success' onClick={() => handleUpdate({ ...payload, status: 'delivered' })}>Mark as Delivered</button>
  }
}


export default function OrderView() {
  const { handleUpdate, fetchOrder } = useOrderActions({ action: 'edit' })
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder().then(order => {
      setOrder(order)
    });

  }, [])

  const updateOrder = async (props) => {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result.isConfirmed) {
        return handleUpdate(props).then(res => {
          setOrder(res.resource)
          Swal.fire(
            'Updated!',
            'Order has been updated.',
            'success'
          )
        })
      }
    })
  }



  return !order?.id ? '' : <>
    <OrderWrapper title="Manage Order">
      <div className="flex justify-center">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <span className='text-xs italic text-gray-500'>
                Order ID: {order.id}
              </span>
              <h1 className="font-bold text-xl">
                Order Summary
              </h1>
            </div>
            <div className={`badge ${badgeColor[order?.status]} rounded-full uppercase`}>
              {order?.status}
            </div>
          </div>
          <div className="divider"></div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Customer */}
            <div>
              <h2 className="text-lg font-light text-gray-400">
                Customer
              </h2>
              <div>

                <h3 className="font-bold text-xl">
                  {order?.user?.info?.first_name} {order?.user?.info?.last_name}
                </h3>
                <h3 className="font-bold text-md text-gray-400">
                  {order?.user?.username}
                </h3>
                <p className='text-gray-400 italic'>
                  {order?.user?.email}
                </p>
                <p>
                  {order?.user?.info?.contact}
                </p>
                <p>
                  {order?.user?.info?.city}, {order?.user?.info?.region}
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
                {/* start shipped date */}
                <div className='flex gap-2'>
                  <h3 className="text-gray-500">
                    Starting Ship Date:
                  </h3>
                  <p>
                    {order.shipping?.start_ship_date?.split('T')[0] || 'Not Shipped'}
                  </p>
                </div>

                {/* shipped date */}
                <div className='flex gap-2'>
                  <h3 className="text-gray-500">
                    Shipped Date:
                  </h3>
                  <p>
                    {order?.shipping?.shipped_date?.split('T')[0] || 'Not Shipped'}
                  </p>
                </div>
                {/* expected */}
                <div className='flex gap-2'>
                  <h3 className="text-gray-500">
                    Expected Delivery Date:
                  </h3>
                  <p>
                    {order?.shipping?.expected_ship_date?.split('T')[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          {/* Items */}
          <h2 className="text-lg font-light text-gray-400">
            Items
          </h2>

          <div>
            {order?.products.map((product, index) => {
              const quantity = order?.quantities[index][product._id];
              const total = parseFloat(product.price * quantity).toFixed(2);
              return (
                <div key={index} className="flex justify-between p-2 border-b border-gray-200 ">
                  <div className='grid md:grid-cols-6 w-full'>
                    <h3 className="font-bold text-lg col-span-4 md:col-span-2">
                      {product.name}
                    </h3>
                    <p className='w-full  md:col-span-2 md:text-end'>
                      {product.price} x {quantity}
                    </p>
                    <p className='w-full md:col-span-2 md:text-end'>
                      {total}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          {/* items total */}
          <div>
            <div className="flex justify-between p-2 border-b border-gray-200">
              <div>
                <h3 className="font-bold text-lg">
                  Subtotal
                </h3>
              </div>
              <div>
                <p>
                  {order?.subTotal}
                </p>
              </div>
            </div>
            <div className="flex justify-between p-2 border-b border-gray-200">
              <div>
                <h3 className="font-bold text-lg">
                  Shippingdelivered
                </h3>
              </div>
              <div>
                <p>
                  {shippingMethods[order?.shipping.method]?.fee}
                </p>
              </div>
            </div>
            <div className="flex justify-between p-2 border-b border-gray-200">
              <div>
                <h3 className="font-bold text-lg">
                  Total
                </h3>
              </div>
              <div>
                <p>
                  {order?.total}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Button */}
      <div className="flex justify-center">
        <div className="container max-w-6xl mx-auto">
          <div className="divider"></div>
          <div className="flex justify-between">

            {
              order?.status !== 'delivered' && order?.status !== 'cancelled' && <button className='btn btn-danger' onClick={() => updateOrder({ ...order, status: 'cancelled' })}>Cancel Order</button>
            }

            {
              order?.status !== 'delivered' && <ProcessButton order={order} handleUpdate={updateOrder} />
            }

          </div>
        </div>
      </div>

    </OrderWrapper>



  </>;
}




