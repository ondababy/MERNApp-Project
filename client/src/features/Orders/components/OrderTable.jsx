import { ActionButtons, Table } from '@common';
import { Checkbox } from "@common/components/ui/checkbox";
import { confirmDelete, DataTable } from '@custom';
import { ArrowUpDown } from "lucide-react";
import { useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { orderApi } from '../order.api'; // Assuming you have a similar API file
import OrderWrapper from './OrderWrapper';

const makeData = (orders, handleDelete) => {
  return orders.map((order) => ({
    ...order,
    id: order.id,
    customer: `${order?.user?.info?.first_name || ''} ${order?.user?.info?.last_name || ''}`.trim(),
    items: `${order?.products?.length || 0}`,
    total: `$${order.total?.toFixed(2) || '0.00'}`,
    status: order.status || 'N/A',
    actions: { id: order.id, handleDelete },
  }));
};

const makeColumns = (navigate) => {
  const interactiveColumns = ["items", "total", "status"].map((key) => {
    return {
      accessorKey: key,
      header: ({ column }) => {
        return (
          <Button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className='bg-transparent border-none btn-sm capitalize'
          >
            {key}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <p className='break-all px-3'>{row.getValue(key)}</p>,
    }
  });

  return [
    // CHECKBOX
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    // USER AVATAR
    {
      accessorKey: 'avatar',
      header: '',
      cell: ({ row }) => {
        const order = row.original;
        const user = order?.user;

        if (user?.info?.avatar) {
          return (
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={user.info.avatar || "https://placehold.co/600"}
                  alt="Customer Avatar"
                />
              </div>
            </div>
          );
        }

        return (
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-16 rounded-full">
              <span className="text-xl">
                {user?.username ? user.username[0].toUpperCase() : 'A'}
              </span>
            </div>
          </div>
        );
      },
      enableColumnFilter: false,
      enableSorting: false,
      enableHiding: false,
    },
    // CUSTOMER INFO
    {
      accessorKey: 'customer',
      header: ({ column }) => {
        return (
          <Button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className='bg-transparent border-none btn-sm capitalize'
          >
            Customer Info
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <details className="collapse bg-transparent transition-all ease-in-out">
          <summary className="collapse-title font-medium">
            {row.original?.user?.username}
          </summary>
          <div className="collapse-content">
            <p>{row.original?.user?.email}</p>
            <p>{row.original?.shipping?.address}</p>

          </div>
        </details>
      ),
    },


    ...interactiveColumns,
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <ActionButtons
          onDelete={() => row.getValue('actions').handleDelete(row.getValue('actions').id)}
          onEdit={() => navigate(`/dashboard/orders/${row.getValue('actions').id}/edit`)}
          showView={false}
        />
      ),
      enableColumnFilter: false,
      enableSorting: false,
      enableHiding: false,
    }
  ];
};

const OrderTable = () => {
  const navigate = useNavigate();
  const { useGetOrdersMutation, useDeleteOrderMutation } = orderApi; // Adjust based on your API
  const [orders, setOrders] = useState([]);
  const [getOrders, { isLoading, isError }] = useGetOrdersMutation();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  // TABLE OPTIONS
  const [table, setTable] = useState({
    data: null,
    columns: null,
    rowCount: 0,
  });

  const handleDelete = async (id) => {
    try {
      confirmDelete(async () => {
        await deleteOrder(id).unwrap();
        setOrders(orders.filter((order) => order.id !== id));
        toast.success('Order deleted successfully');
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders().unwrap();
        setOrders(res.resource || []);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchOrders();
  }, [getOrders]);

  useEffect(() => {
    setTable(prev => ({
      ...prev,
      data: makeData(orders, handleDelete),
      columns: makeColumns(navigate),
      rowCount: orders.length,
    }));
  }, [orders, navigate]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading orders</div>;

  if (!orders.length) {
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
  }

  return (
    <OrderWrapper title="Orders Table">
      <DataTable {...table} />
    </OrderWrapper>
  );
};

export default OrderTable;