import Autoplay from "embla-carousel-autoplay"
import * as React from "react"

import { Card, CardContent } from "@common/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@common/components/ui/carousel"

const defaults = [
    {
        src: "https://placehold.co/400",
        alt: "n/a",
    },
    {
        src: "https://placehold.co/900x900",
        alt: "n/a",
    },
]

export function CarouselComponent({ images = defaults }) {
    images = images.length ? images : defaults
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )

    return (
        <Carousel
            plugins={[plugin.current]}
            className="h-full mx-16"
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
