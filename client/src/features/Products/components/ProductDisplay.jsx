import React from 'react'

import { CarouselComponent } from '@custom'
import { Breadcrumbs } from '@partials'

const productExample = {
    name: 'JBL Tour Pro+ TWS',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor praesentium in sed rerum nostrum. Laborum in aliquid illum, quidem cumque excepturi. Iure ea in, dolore fugiat repudiandae quod soluta corporis!',
    price: 1999.99,
    currency: 'PHP',
    images: [
        {
            src: "https://placehold.co/400",
            alt: "n/a",
        },
        {
            src: "https://placehold.co/900x900",
            alt: "n/a",
        },
        {
            src: "https://placehold.co/900x900",
            alt: "n/a",
        },
        {
            src: "https://placehold.co/900x900",
            alt: "n/a",
        },
        {
            src: "https://placehold.co/900x900",
            alt: "n/a",
        },
    ]


}

export default function ProductDisplay({ data = productExample, children }) {
    const [product, setProduct] = React.useState(data)

    return (
        <div className='w-screen min-h-screen h-screen flex lg:flex-row items-start'>
            <div className='w-full'>
                <div className="overflow-hidden max-h-[30rem] bg-base-200/30 border-y border-base-content/10 p-1">

                    <Breadcrumbs />
                    <CarouselComponent
                        imageList={product.images}
                        className="h-[30rem] max-h-[42rem]" />

                </div>

                {children}
            </div>

            <div className='p-8 container max-w-sm h-screen border border-base-content/10 bg-base-100'>
                <h1 className='font-bold text-4xl'>
                    {product.name}
                </h1>
                <p className='text-sm my-2'>
                    {product.description.split('.')[0]}
                </p>
                <div className="divider"></div>
                <span className='text-3xl font-light'>
                    {product.currency} {product.price}
                </span>
                <p className='font-light my-2'>
                    {product.description.split('.').slice(1).join('.')}
                </p>
                <div className="flex gap-2 items-center my-8">
                    <div className="w-1/2 btn btn-primary btn-outline">
                        Add To Cart
                    </div>
                    <div className="w-1/2 btn btn-primary">
                        Buy Now
                    </div>
                </div>
                <p className='text-xs italic font-light'>
                    Pickup available at out nearest branch.
                    Usually ready in 24 hours
                </p>

            </div>
        </div>
    )
}
