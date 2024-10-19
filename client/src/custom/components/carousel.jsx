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
    const [images, setImages] = React.useState(imageList || defaults)
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
                {images.map((image, index) => (
                    <CarouselItem key={index} className="h-full flex justify-center">
                        <img className="max-h-full object-contain" src={image.src} alt={image.alt} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            {
                images.length > 1 && <>
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
