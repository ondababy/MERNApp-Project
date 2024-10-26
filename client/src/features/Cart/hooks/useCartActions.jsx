import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartApi } from '../cart.api';
import { addItem, clearCart, removeItem, setItems, setSelected, updateItem } from '../cart.slice';

export function useCartActions() {
  /* DECLARATIONS #################################################### */
  const dispatch = useDispatch();
  const { selectedIds, ...cart } = useSelector((state) => state.cart);

  const [getCartItems] = cartApi.useGetItemsMutation();
  const [createCartItem] = cartApi.useCreateItemMutation();
  const [updateCartItem] = cartApi.useUpdateItemMutation();
  const [deleteCartItem] = cartApi.useDeleteItemMutation();
  /* END DECLARATIONS ################################################ */

  const getItems = React.useCallback(() => {
    return getCartItems().unwrap().then((data) => {
      dispatch(setItems(data?.resource || []));
    });
  }, [dispatch, getCartItems]);

  const selectItem = React.useCallback((item) => {
    return dispatch(setSelected({ selectedItem: item }));
  });

  const addItemToCart = React.useCallback((item) => {
    return createCartItem(item).unwrap().then((data) => {
      dispatch(addItem(data?.resource || {}));
      return data?.resource || {};
    });
  }, [dispatch, createCartItem]);

  const updateCartItemInCart = React.useCallback((item) => {
    return updateCartItem({
      id: item.id,
      item,
    }).unwrap().then((data) => {
      dispatch(updateItem(data?.resource || {}));
      return data?.resource || {};
    });
  }, [dispatch, updateCartItem]);

  const removeItemFromCart = React.useCallback((item) => {
    return deleteCartItem(item.id).unwrap().then(() => {
      dispatch(removeItem(item));
    });
  }, [dispatch, deleteCartItem]);

  const clearCart = React.useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  React.useEffect(() => {
    getItems();
  }, []);

  return {
    cart,
    getItems,
    selectItem,
    addItem: addItemToCart,
    updateItem: updateCartItemInCart,
    removeItem: removeItemFromCart,
  };
}