import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

import { Card, CardContent } from "@common/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@common/components/ui/carousel";
import { cn } from '@common/lib/utils';

const defaults = [
    {
        src: "https://placehold.co/400",
        alt: "n/a",
    },
]

export function CarouselComponent({ imageList = null, className }) {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )

    return (
        <Carousel
            plugins={[plugin.current]}
            className={cn('h-full mx-16', className)}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent className="h-full">
                {(imageList || defaults).map((image, index) => (
                    <CarouselItem key={index} className="h-full flex justify-center">
                        <img className="max-h-full object-contain" src={image.src} alt={image.alt} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            {
                imageList.length > 1 && <>
                    <CarouselPrevious
                        className="h-full bg-transparent rounded hover:bg-base-content/20 text-base-content border-none"
                    />
                    <CarouselNext
                        className="h-full bg-transparent rounded hover:bg-base-content/20 text-base-content border-none"
                    />
                </>
            }
        </Carousel>
    )
}


export function CarouselGroup({ imageList = null, className }) {
    <Carousel className="w-full max-w-sm">
        <CarouselContent className="-ml-1">
            {(imageList || defaults).map((image, index) => (
                <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                    <img className="max-h-full object-contain" src={image.src} alt={image.alt} />
                </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>
}