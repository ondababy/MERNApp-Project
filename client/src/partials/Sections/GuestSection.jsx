

import { SelectComponent } from '@common';
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import { FaMinus } from "react-icons/fa";


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@common/components/ui/accordion";
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

function GuestSection({ images = defaults }) {
  images = images.length ? images : defaults
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

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
              <div>
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
        <div className="mx-8 py-4 w-full border border-green-400 h-full">
          <div className="flex justify-between items-center">
            <h1 className="text-5xl font-display">
              Our Products
            </h1>

            <SelectComponent />


          </div>
          <div className="my-8 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {
              Array(9).fill().map((_, i) => (
                <Card >
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

              ))
            }

          </div>


        </div>


      </div>
    </div>
  );
}

export default GuestSection;
