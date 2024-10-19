import React from 'react'

import { SelectComponent } from '@common'
import { ProductFilters, ProductGrid } from '@features'
import { Banner } from '@partials'

export default function ShopScreen() {
  return (
    <div className="w-full">
      {/* BANNER */}
      <Banner />

      {/* CONTENT */}
      <div className='flex min-h-screen '>
        {/* Filters */}
        <ProductFilters />



        {/* Products */}
        <div className="flex flex-col mx-8 py-4 w-full">

          {/* Headline */}
          <div className="flex justify-between items-center">
            <h1 className="text-5xl font-display">
              Our Products
            </h1>
            <SelectComponent />
          </div>

          {/* Content */}
          <ProductGrid />

        </div>
      </div>
    </div>
  )
}


