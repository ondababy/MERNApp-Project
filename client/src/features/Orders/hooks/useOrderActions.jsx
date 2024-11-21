
import { confirmDelete, confirmSave, requestError, toFormData } from '@custom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { orderApi } from '../order.api';
import { setOrder } from '../order.slice';
import { setShipping } from '../order.slice.js';


export function useOrderActions({ cartData = {}, action = 'create', render = false }) {

  /* DECLARATIONS #################################################### */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id = null } = useParams()

  const { userInfo, role } = useSelector((state) => state.auth) || cartData;
  const cart = useSelector((state) => state.cart) || cartData;
  const order = useSelector((state) => state.order);
  const selectedItems = cart?.items ? cart?.items.filter(item => item?.selected) : [];

  const [orders, setOrders] = useState([]);
  const [createOrder] = orderApi.useCreateOrderMutation();
  const [updateOrder] = orderApi.useUpdateOrderMutation();
  const [deleteOrder] = orderApi.useDeleteOrderMutation();
  const [getOrder] = orderApi.useGetOrderMutation();
  const [getOrders] = orderApi.useGetOrdersMutation();
  /* END DECLARATIONS ################################################ */


  const fetchOrders = useCallback(async () => {
    const res = await getOrders().unwrap();
    setOrders(res?.resource || []);
    return res.resource || [];
  })

  const fetchOrder = useCallback(async () => {
    return getOrder(id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        navigate(role === 'admin' ? '/dashboard/orders/table' : '/');
      } else if (res.data) {
        setOrder(res.data.resource)
        return res.data.resource
      };
    });
  })
  const handleCreate = useCallback(async (values) => {
    await createOrder(values).unwrap().then(res => {
      // dispatch(clearCart());
      // dispatch(clearOrder());
      toast.success('Create successful!');
      navigate(role === 'admin' ? '/dashboard/orders/table' : '/');
    });
  })
  const handleUpdate = useCallback(async (values) => {
    const res = await updateOrder({ id: order.id, order: values }).unwrap();
    const updatedOrder = res?.resource || { ...order, ...values };
    toast.success('Update successful!');
  })
  const handleDelete = useCallback(async (id) => {
    confirmDelete(async () => {
      try {
        await deleteOrder(id).unwrap();
        toast.success('Order deleted successfully');
        setOrders(orders.filter((order) => order.id !== id));
      } catch (error) {
        toast.error(error.message);
      }
    });
  })
  const handleSubmit = useCallback(async (values) => {
    try {
      values = toFormData(values);
      if (action === 'create') await handleCreate(values);
      else await handleUpdate(values);
    } catch (error) {
      requestError(error);
    }
  })
  const onSubmit = useCallback(async (values) => {
    confirmSave(async () => handleSubmit(values));
  })

  const handleShipping = (shipping) => {
    dispatch(setShipping(shipping));
  }
  const handleCheckout = () => {
    const payload = {
      userId: userInfo.id,
      products: selectedItems.map(item => ({ product: item.product.id, quantity: item.quantity })),
      payment: {
        method: order.payment.key,
        status: 'pending',
      },
      shipping: {
        method: order.shipping.key,
        address: [userInfo.info.address, userInfo.info.city, userInfo.info.state, userInfo.info.zip_code].join(', '),
      },
      total: order.total,
    }
    handleCreate(payload);
  }


  useEffect(() => {
    const fetchOrder = async () => {
    };

    if (id) fetchOrder();
  }, [action, id]);

  useEffect(() => {
    render && dispatch(setOrder(selectedItems));
  }, [cart, render]);


  return {
    order,
    orders,
    fetchOrders,
    fetchOrder,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleSubmit,
    onSubmit,
    handleCheckout,
    handleShipping,
  }
}
