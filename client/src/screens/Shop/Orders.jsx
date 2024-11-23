import { OrderList } from '@features'
import React from 'react'
import ShopWrapper from './Wrapper'

export default function Orders() {
  return (
    <ShopWrapper bannerText="YOUR ORDERS" childClass="flex-col md:min-h-screen md:flex-row md:flex-row-reverse">
      <OrderList />
    </ShopWrapper>
  )
}
