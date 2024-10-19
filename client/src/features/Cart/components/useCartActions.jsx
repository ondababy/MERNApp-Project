import React from 'react';
import { useSelector } from 'react-redux';
import { cartApi } from '../cart.api';

// For non authenticated users
import { cartSlice } from '../cart.slice';

// Todo: Implement useCartActions hook
export function useCartActions() {
  /* DECLARATIONS #################################################### */
  const [items, setItems] = React.useState([]);
  const { getCartItems } = cartApi.useGetItemMutation();
  const { createCartItem } = cartApi.useCreateItemMutation();
  const { updateCartItem } = cartApi.useUpdateItemMutation();
  const { deleteCartItem } = cartApi.useDeleteItemMutation();
  const { getItem } = cartApi.useGetItemMutation();
  /* END DECLARATIONS ################################################ */

  const getItems = React.useCallback(() => {

  }, []);

  const addItem = React.useCallback((item) => {

  }, []);

  const updateItem = React.useCallback((item) => {

  }, []);

  const removeItem = React.useCallback((item) => {

  }, []);


  React.useEffect(() => {
    getItems();
  }, []);




  return {
    items,
    setItems,
    getItems,
    addItem,
    updateItem,
    removeItem,
  }

}
