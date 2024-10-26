import React from 'react';

import { confirmDelete } from '@custom';
import { useCartActions } from '../hooks/useCartActions';
import { CartCard } from './CartCard';


export default function CartList() {
  const {
    cart: { items, subTotal },
    getItems,
    removeItem,
    selectItem,
  } = useCartActions()


  const handleRemove = async (cartItem) => {
    confirmDelete(() => {
      removeItem(cartItem).then(() => {
        getItems();
      })
    });
  }

  return (
    <div className="bg-base-200/50 p-8 container mx-auto">
      <h1 className='font-extrabold tracking-wider text-2xl uppercase'>
        Your Items
      </h1>
      <div className="divider"></div>

      {!(items?.length && items[0]?.id) && <h1 className="text-center w-full font-bold uppercase">
        No items in cart.
      </h1>}
      <div className="flex flex-col gap-4">
        {
          items?.length ?
            items.map((item) => (
              <CartCard
                key={item.id} item={item}
                onRemove={handleRemove}
                onSelect={e => selectItem(item)}
                className={`${item.selected ? 'bg-primary/10 border border-primary transition-all ease-out' : ''}`}
              />
            )) : ''
        }
      </div>
    </div >

  )
}
