import { ActionButtons, Table } from '@common';
import { useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useOrderActions } from '../hooks/useOrderActions';
import OrderWrapper from './OrderWrapper';

const allowedColumns = () => [
  { key: 'customer', label: 'Customer' },
  { key: 'items', label: 'Items' },
  { key: 'total', label: 'Total' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: '' },

  // More columns can be added here
];

const OrderTable = () => {
  const navigate = useNavigate();
  const { fetchOrders, handleDelete, orders } = useOrderActions({});

  useEffect(() => {
    fetchOrders()
  }, [])



  if (!orders.length)
    return (
      <div className="flex items-center justify-center space-x-2 font-bold text-center">
        <span>No data found! Create one. </span>
        <Button
          color="primary"
          className="my-4"
          onClick={() => navigate('/dashboard/orders/create')}
        >
          <FaPlus />
        </Button>
      </div>
    );
  return (
    <>
      <OrderWrapper title="Orders Table">
        <Table
          data={orders.map((order) => ({
            ...order,
            customer: (<>
              <div class="flex items-center gap-3">
                {order?.user?.info?.avatar && <div class="avatar">
                  <div class="mask mask-squircle h-12 w-12">
                    <img
                      src={order?.user?.info?.avatar || "https://placehold.co/600"}
                      alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>}
                {!order?.user?.info?.avatar &&
                  <div class="avatar placeholder">
                    <div class="bg-neutral text-neutral-content w-16 rounded-full">
                      <span class="text-xl">{order?.user?.username && order?.user?.username[0].toUpperCase() || 'Anon'}</span>
                    </div>
                  </div>}
                <div>
                  <div class="font-bold flex gap-2">
                    <span>
                      {order?.user?.info?.first_name}
                    </span>
                    <span>
                      {order?.user?.info?.last_name}
                    </span>
                  </div>
                  <div class="text-sm opacity-50">
                    {order?.user?.email}
                  </div>
                  <div class="text-sm opacity-50">
                    {order?.user?.info?.contact}
                  </div>
                </div>
              </div>
            </>),
            items: (<>
              <span>{order?.products?.length}</span>
            </>),
            actions: (
              <ActionButtons
                key={'action_' + order.id}
                className="flex justify-end"
                onDelete={() => handleDelete(order.id)}
                onEdit={() => navigate(`/dashboard/orders/${order.id}/edit`)}
                onView={() => navigate(`/dashboard/orders/${order.id}/view`)}
              />
            ),
          }))}
          columns={allowedColumns()}
        />
      </OrderWrapper>
    </>
  );
};

export default OrderTable;
