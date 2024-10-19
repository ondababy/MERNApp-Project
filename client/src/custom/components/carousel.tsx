import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@common/components/ui/carousel';
import { cn } from '@common/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import * as React from 'react';

const defaults = [
  {
    src: 'https://placehold.co/400',
    alt: 'n/a',
  },
];

export function CarouselComponent({ imageList = null, currentIndex = 0, className }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(currentIndex);
  const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  React.useEffect(() => {
    if (!api) {
      return;
    }
  }, [api]);

  const handleThumbClick = (index) => {
    setCurrent(index);
    api.scrollTo(index);
    console.log(api);
  };

  return (
    <>
      <Carousel
        plugins={[plugin.current]}
        className={cn('h-full mx-16', className)}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        setApi={setApi}
      >
        <CarouselContent className="h-full">
          {(imageList || defaults).map((image, index) => (
            <CarouselItem
              key={index}
              className="h-full flex justify-center"
            >
              <img
                className="max-h-full object-contain"
                src={image.src}
                alt={image.alt}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {imageList.length > 1 && (
          <>
            <CarouselPrevious className="h-full bg-transparent rounded hover:bg-base-content/20 text-base-content border-none" />
            <CarouselNext className="h-full bg-transparent rounded hover:bg-base-content/20 text-base-content border-none" />
          </>
        )}
      </Carousel>

      {/* mini images */}
      <div className="flex gap-2 mt-2 justify-center">
        {imageList.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            onClick={() => handleThumbClick(i)}
            className={cn(
              'w-12 h-12 object-cover border border-base-content/10 rounded-md cursor-pointer',
              i === current ? 'border-primary' : 'opacity-20'
            )}
          />
        ))}
      </div>
    </>
  );
}
