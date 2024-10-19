import React from 'react'

import { SelectComponent } from '@common'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@common/components/ui/accordion'
import { PaginationComponent } from '@custom'

export default function ShopScreen() {
    return (

        <div className="w-full">
            {/* BANNER */}
            <div className='border border-blue-400 min-h-56'>
            </div>

            {/* CONTENT */}
            <div className='flex border border-red-400 min-h-screen '>
                {/* Filters */}
                <div className="container max-w-sm border border-red-400 h-full">
                    <div className="divider"></div>
                    <div className="my-4 h-full overflow-auto">
                        {/* FILTERS */}

                        {Array(5).fill().map((_, i) => (
                            <div key={i}>
                                <Accordion type="single" defaultValue="item-1" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>
                                            <div className="flex justify-between items-start">
                                                <h1 className="text-xl px-4 font-bold">
                                                    Filter {i}
                                                </h1>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className='border border-green-500 h-32'>

                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Products */}
                <div className="flex flex-col mx-8 py-4 w-full border border-green-400">

                    {/* Headline */}
                    <div className="flex justify-between items-center">
                        <h1 className="text-5xl font-display">
                            Our Products
                        </h1>
                        <SelectComponent />
                    </div>

                    {/* Content */}
                    <div className="my-8 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {
                            Array(9).fill().map((_, i) => (
                                <div key={i}></div>
                            ))
                        }

                    </div>

                    {/* Pagination */}
                    <div className="mt-auto">

                        <PaginationComponent />
                    </div>
                </div>


            </div>
        </div>
    )
}
