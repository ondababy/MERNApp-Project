import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@common/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@common/components/ui/carousel";
const defaults = [
  {
    src: "https://placehold.co/400",
    alt: "n/a",
  },
]

function ProductCard({ images = defaults, ...props }) {
  images = images.length ? images : defaults
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  return (

    <Card {...props}>
      <CardContent className="p-4">

        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <img className="rounded  aspect-square object-contain" src={image.src} alt={image.alt} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {
            images.length > 1 && <>
              <CarouselPrevious
                className="text-black"
              />
              <CarouselNext
                className="text-black"
              />
            </>
          }
        </Carousel>
      </CardContent>
      <CardHeader className="p-4">
        <div className="divider"></div>
        <CardTitle className="text-sm font-semibold">
          Product Name 123-XXX
        </CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </CardDescription>
      </CardHeader>
      <CardFooter className="p-4 flex items-end gap-1">
        <p className='text-md'>
          $100.00
        </p>
        <p className='text-xs mb-1'>
          each
        </p>
      </CardFooter>
    </Card>

  );
}

ProductCard.propTypes = {};

export default ProductCard;
