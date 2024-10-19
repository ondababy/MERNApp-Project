import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@common/components/ui/card";
import { CarouselComponent } from "@custom";
import { FiShoppingCart } from "react-icons/fi";
import { IoBagCheckSharp } from "react-icons/io5";
const defaultProduct = {
  name: "Product Name",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  price: 100.0,
  currency: "PHP",
  images: [
    {
      src: 'https://placehold.co/600',
      alt: 'n/a',
    },
  ]
}

function ProductCard({ product = defaultProduct, ...props }) {

  return (
    <Card className="overflow-clip">
      <CardContent className="p-0 overflow-clip relative">
        <CarouselComponent imageList={product.images} className="overflow-clip w-full aspect-square m-0" />
        <div className="absolute bottom-0 w-full h-full bg-black flex items-end bg-opacity-50 opacity-0 hover:opacity-100 transition-all ease-in">
          <button className="flex justify-center item-center gap-2 bg-primary text-white text-sm py-2 px-4 w-full">
            <span className="flex items-center">
              <IoBagCheckSharp width={20} height={20} />
            </span>
            View Product
          </button>
        </div>

      </CardContent>

      <CardHeader className="p-4">
        <div className="divider m-0"></div>
        <CardTitle className="text-sm font-semibold">
          {product.name}
        </CardTitle>
        <CardDescription>
          {
            product.description.length > 50 ?
              product.description.substring(0, 100) + "..."
              : product.description
          }
        </CardDescription>
      </CardHeader>
      <CardFooter className="p-4 flex items-end gap-1">
        <p className='text-md'>
          {product.currency}
          {product.price}
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
