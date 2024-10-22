import { CheckoutPage } from '@features'
import React from 'react'
import ShopWrapper from './Wrapper'

export default function Checkout() {
  return (
    <ShopWrapper bannerText="CHECKOUT" childClass="flex-col md:min-h-screen flex-col-reverse md:flex-row md:flex-row-reverse">
      <CheckoutPage />
    </ShopWrapper>
  )
}
