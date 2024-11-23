import React from 'react';

const badgeColor = {
  pending: 'bg-yellow-500',
  processing: 'bg-blue-500',
  shipped: 'bg-green-500',
  delivered: 'bg-green-500',
  cancelled: 'bg-red-500',
}

import { MessageCircle } from 'lucide-react';

export default function OrderCard({ order, onClick, key }) {
  return (
    <div key={order._id} className="card border cursor-pointer hover:bg-base-content/10" onClick={onClick}>
      <div className="card-body">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <div>
            <h2 className="text-lg font-bold">Order ID: {order.id}</h2>
            <p className="text-sm">Placed on {new Date(order.createdAt).toDateString()}</p>
          </div>
          <div className="flex gap-4 lg:flex-row-reverse items-center">
            {order.status === 'delivered' && (
              <div className="btn btn-info btn-sm btn-outline aspect-square">
                <MessageCircle />
              </div>
            )}
            <div className={`badge ${badgeColor[order.status]} text-white`}>{order.status}</div>
          </div>
        </div>

        <div className="divider"></div>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <div>
            <h3 className="text-lg font-bold">Items</h3>
            <p className="text-sm">{order.products.map((item) => item.name).join(', ')}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Total</h3>
            <p className="text-sm">{order.total}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
