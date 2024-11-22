import React from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@common/components/ui/accordion'

function Filter({ children, ...props }) {
    return (
        <Accordion type="single" defaultValue="item-1" collapsible {...props}>
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <div className="flex justify-between items-start">
                        <h1 className="text-xl px-4 font-bold">
                            Filter
                        </h1>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className='px-4 min-h-32'>
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

                <Filter>
                    Price Filter
                </Filter>
                <Filter>
                    Category Filter
                </Filter>
                <Filter>
                    Ratings Filter
                </Filter>


            </div>
        </div>
    )
}
