
import { confirmSave, requestError, toFormData } from '@custom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { orderApi } from '../order.api';
import { getAltFields, getFields } from '../order.fields';
import { setOrder } from '../order.slice';
import { setShipping } from '../order.slice.js';
import { orderValidation } from '../order.validation';


export function useOrderActions({ cartData = {}, action = 'create' }) {

  /* DECLARATIONS #################################################### */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id = null } = useParams()
  const fields = typeof getFields === 'function' ? getFields() : getFields || [];
  const altFields = typeof getAltFields === 'function' ? getAltFields() : getAltFields || [];
  const cart = useSelector((state) => state.cart) || cartData;
  const selectedItems = cart?.items ? cart?.items.filter(item => item?.selected) : [];
  const order = useSelector((state) => state.order);
  const [orderSchema, setOrderSchema] = useState(fields);
  const [createOrder, { isLoading: isCreating }] = orderApi.useCreateOrderMutation();
  const [updateOrder, { isLoading: isUpdating }] = orderApi.useUpdateOrderMutation();
  const [getOrder] = orderApi.useGetOrderMutation();
  const [getOrders] = orderApi.useGetOrdersMutation();
  /* END DECLARATIONS ################################################ */

  const initialValues = useMemo(
    () =>
      orderSchema.reduce((acc, field) => {
        acc[field.name] = action === 'create' ? '' : order?.[field.name] ?? '';
        return acc;
      }, {}),
    [order, orderSchema, action]
  );

  const fetchOrders = useCallback(async () => { })
  const fetchOrder = useCallback(async () => {
    getOrder(id).then((res) => {
      if (res.error) {
        toast.error(res.error.data.message);
        navigate('/dashboard/orders/table');
      } else if (res.data) setOrder(res.data.resource);
    });
  })
  const handleCreate = useCallback(async (values) => {
    await createOrder(values).unwrap();
    navigate('/dashboard/orders/table');
    toast.success('Create successful!');
  })
  const handleUpdate = useCallback(async (values) => {
    const res = await updateOrder({ id: order.id, order: values }).unwrap();
    const updatedOrder = res?.resource || { ...order, ...values };
    toast.success('Update successful!');
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
    alert(JSON.stringify(order, null, 2));
  }


  useEffect(() => {
    const fetchOrder = async () => {
    };

    if (id) fetchOrder();
    else setOrderSchema(action === 'create' ? fields : altFields);
  }, [action, id]);

  useEffect(() => {
    dispatch(setOrder(selectedItems));
  }, [cart]);


  return {
    order,
    formikProps: {
      initialValues,
      validationSchema: orderValidation,
      onSubmit: onSubmit,
      enableReinitialize: true,
    },
    initialValues,
    orderSchema,
    isCreating,
    isUpdating,
    fetchOrders,
    fetchOrder,
    handleCreate,
    handleUpdate,
    handleSubmit,
    onSubmit,
    handleCheckout,
    handleShipping,
  }
}
