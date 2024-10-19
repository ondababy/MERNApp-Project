import React from 'react'
import { productApi } from '../product.api'

import { BackButton } from '@common'
import { Counter, Gallery } from '@custom'
import { Breadcrumbs } from '@partials'
import { useParams } from 'react-router-dom'

const productExample = {
  name: 'Lorem ipsum dolor sit amet.',
  description: 'Dolor praesentium in sed rerum nostrum. Laborum in aliquid illum, quidem cumque excepturi. Iure ea in, dolore fugiat repudiandae quod soluta corporis!',
  price: 1999.99,
  currency: 'PHP',
}

export default function ProductDisplay({ data = productExample, children }) {
  /* DECLARATIONS #################################################### */
  const slugParam = useParams().slug;
  const [getProduct, { isLoading }] = productApi.useGetProductMutation();
  const [product, setProduct] = React.useState(data)
  const [cartItem, setCartItem] = React.useState({
    quantity: 1,
    total: product.price,
    productId: product.id,
  })
  /* END DECLARATIONS ################################################ */

  const handleQuantity = (quantity) => {
    setCartItem({
      ...cartItem,
      quantity,
      total: product.price * quantity,
    })
  }
  const fetchProduct = React.useCallback(async () => {
    getProduct(slugParam).unwrap().then((res) => {
      setProduct(res?.resource);
      setCartItem({
        ...cartItem,
        productId: res?.resource?.id,
        total: res?.resource?.price
      })
    })
  });


  React.useEffect(() => {
    fetchProduct();
  }, [])

  return (
    <div className='w-screen min-h-screen h-screen flex lg:flex-row items-start'>
      <div className='w-full'>
        <div className="overflow-hidden max-h-[42rem] bg-base-200/30 border-y border-base-content/10 p-1">
          <Breadcrumbs />
          <Gallery
            imageList={product.images || []}
            className="h-[30rem] max-h-[42rem]" />
        </div>

        {children}
      </div>

      <div className='py-4 px-8 container max-w-sm h-screen border border-base-content/10 bg-base-100'>
        <div className="flex items-end justify-end">
          <BackButton className="btn-ghost" />
        </div>
        <h1 className='font-bold text-4xl'>
          {product.name}
        </h1>
        <p className='text-sm my-2'>
          {product.description.split('.')[0]}
        </p>
        <div className="divider"></div>
        <span className='text-3xl font-light'>
          {product.currency || 'PHP'} {product.price}
        </span>
        <p className='font-light my-2'>
          {product.description.split('.').slice(1).join('.')}
        </p>

        <Counter onChange={(count) => handleQuantity(count)} />
        <div className="divider"></div>
        <div className="flex items-center justify-between text-xl font-light">
          <span>
            Item Total:
          </span>
          <span className='font-normal'>
            {product.currency || 'PHP'} {cartItem.total}
          </span>
        </div>


        <div className="flex gap-2 items-center my-8">
          <div className="w-1/2 btn btn-primary btn-outline">
            Add To Cart
          </div>
          <div className="w-1/2 btn btn-primary">
            Buy Now
          </div>
        </div>
        <p className='text-xs italic font-light'>
          {product?.footerMessage || 'We ship nationwide!'}
        </p>

      </div>
    </div>
  )
}
