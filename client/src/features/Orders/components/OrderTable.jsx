import { ActionButtons, Table } from '@common';
import { useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useOrderActions } from '../hooks/useOrderActions';
import OrderWrapper from './OrderWrapper';

const allowedColumns = () => [
  { key: 'user.info', label: 'Customer' },
  { key: 'actions', label: '' },
  // More columns can be added here
];

const OrderTable = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const { fetchOrders, handleDelete } = useOrderActions({});

  useEffect(() => {
    fetchOrders().then((res) => {
      setOrders(res);
    });
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
            actions: (
              <ActionButtons
                key={'action_' + order.slug}
                className="flex justify-end"
                onDelete={() => handleDelete(order.id)}
                onEdit={() => navigate(`/dashboard/orders/${order.slug}/edit`)}
                onView={() => navigate(`/dashboard/orders/${order.slug}/view`)}
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
