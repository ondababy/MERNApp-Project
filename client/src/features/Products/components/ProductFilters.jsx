import React from 'react'

import { Rating } from '@common'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@common/components/ui/accordion'

const priceRanges = [
    'Up to P5000',
    'P5000 - P10000',
    'P10000 - P20000',
    'Over P20000'
]
const shoeCategories = [
    'Sneakers',
    'Boots',
    'Sandals',
    'Slippers',
    'Formal Shoes',
    'Men\'s Shoes',
    'Women\'s Shoes',
    'Kids\' Shoes'
]

function Filter({ title, children, ...props }) {
    return (
        <Accordion type="single" defaultValue="item-1" collapsible {...props}>
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <div className="flex justify-between items-start">
                        <h1 className="text-xl px-4 font-bold">
                            {title || 'Filter'}
                        </h1>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className='px-4'>
                        {children}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default function ProductFilters() {
    return (
        <div className="hidden container max-w-sm lg:block">
            <div className="divider"></div>
            <div className="my-4 overflow-auto">
                {/* FILTERS */}

                <Filter title={"Price Range"}>
                    <div>
                        {priceRanges.map((range, index) => (
                            <div key={index} className="flex items-center justify-between py-2">
                                <label className="flex items-center">
                                    <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
                                    <span className="ml-2">{range}</span>
                                </label>
                            </div>
                        ))}
                        <div className="divider"></div>
                        {/* Custom */}
                        <div className="flex items-center justify-between py-2">
                            <label className="flex items-center">
                                <span className="ml-2">Set Range</span>
                            </label>
                            <div className="flex items-center">
                                <input type="text" className="input input-bordered input-sm w-16" />
                                <span className="mx-2">-</span>
                                <input type="text" className="input input-bordered input-sm w-16" />
                            </div>
                        </div>
                    </div>
                </Filter>
                <Filter title={"Categories"}>
                    <label className="my-2 input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Search" />
                    </label>
                    <div className="divider"></div>

                    <div className="">
                        {shoeCategories.map((category, index) => (
                            <div key={index} className="flex items-center justify-between py-2">
                                <label className="flex items-center">
                                    <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
                                    <span className="ml-2">{category}</span>
                                </label>
                            </div>
                        ))}
                    </div>


                </Filter>
                <Filter title={"Ratings"}>
                    <div className="flex items-center text-lg gap-8">
                        <span>Filter By: </span>
                        <Rating onChange={() => { }} />

                    </div>
                </Filter>


            </div>
        </div>
    )
}
