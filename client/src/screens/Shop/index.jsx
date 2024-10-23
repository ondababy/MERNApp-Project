import shoes_splash from '@assets/images/shoes-splash.jpg'
import { SelectComponent } from '@common'
import { ProductFilters, ProductGrid } from '@features'
import React from 'react'
import ShopWrapper from './Wrapper'

export { default as Cart } from './Cart'
export { default as Checkout } from './Checkout'
export { default as ProductDisplay } from './Product'



export function Shop() {
  return (
    <ShopWrapper bgImage={shoes_splash} childClass={'flex-col lg:flex-row'}>
      {/* <ProductFilters /> */}
      <div className="flex flex-col lg:mx-8 lg:px-0 p-4 w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-5xl font-display">
            Our Products
          </h1>
          <SelectComponent />
        </div>
        <ProductGrid />
      </div>

    </ShopWrapper >
  )
}



