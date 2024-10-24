import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderApi } from '../order.api';

export function useOrderActions(cartData = {}) {

  /* DECLARATIONS #################################################### */
  const dispatch = useDispatch();
  const order = useSelector((state) => state.cart) || cartData;
  const [getOrders] = orderApi.useGetOrdersMutation()
  const [getOrder] = orderApi.useGetOrderMutation()
  const [createOrder] = orderApi.useCreateOrderMutation()
  const [updateOrder] = orderApi.useUpdateOrderMutation()
  /* END DECLARATIONS ################################################ */

  const getOrdersAction = React.useCallback(() => { })
  const getOrderAction = React.useCallback(() => { })
  const createOrderAction = React.useCallback(() => { })
  const updateOrderAction = React.useCallback(() => { })


  return {
    order

  }
}
