import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@common/components/ui/card";

import { Rating } from "@common";
import { cn } from "@common/lib/utils";
import { CarouselComponent } from "@custom";
import { useCartActions } from '@features';
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { IoBagCheckSharp } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const defaultProduct = {
  id: -1,
  name: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  description: "Doloremque quae optio sint quam quos fugit et maiores tenetur? Voluptatibus ipsum veritatis a eum, impedit non minima provident explicabo sint similique!",
  price: 100.0,
  currency: "PHP",
  images: [
    {
      src: 'https://placehold.co/600?text=n/a',
      alt: 'n/a',
    },
  ]
}

function ProductCard({ product = defaultProduct, className, ...props }) {
  const navigate = useNavigate();
  const { addItem } = useCartActions();
  const ToastContent = () => (
    <div>
      <p>
        <span className='font-bold text-primary'>
          {product.name}
        </span>
        <span className='italic'>
          has been added to cart!
        </span>
      </p>
      <button
        onClick={() => navigate('/cart')}
        className="btn btn-sm btn-outline btn-primary mt-4">
        View Cart
      </button>
    </div>
  );
  const handleAddToCart = () => {
    addItem({
      quantity: 0,
      incrementBy: 1,
      total: product.price.toFixed(2),
      product: product.id,
    }).then(() => {
      toast.success(<ToastContent />);
    })
  }

  const handleViewProduct = (slug) => () => {
    navigate(`/shop/${slug}`);
  }
  const images = product?.images?.length ? product.images.map(i => {
    return {
      src: i.url,
      alt: i.filename,
    }
  }) : defaultProduct.images;
  // l = Math.random() * 10;
  return product.id != -1 ? (
    <Card className={cn("overflow-clip", className)} onDoubleClick={handleViewProduct(product.slug)} {...props}>
      <CardContent className="p-0 overflow-clip relative">
        <CarouselComponent imageList={images} className="overflow-clip w-full aspect-square m-0" />
        <div className="absolute bottom-0 w-full h-full bg-black flex items-end bg-opacity-50 opacity-0 hover:opacity-100 transition-all ease-in">
          <button
            onClick={handleViewProduct(product.slug)}
            className="flex justify-center item-center gap-2 bg-primary text-white text-sm py-2 px-4 w-full">
            <span className="flex items-center">
              <IoBagCheckSharp width={20} height={20} />
            </span>
            View Product
          </button>
        </div>

      </CardContent>

      <CardHeader className="p-4" {...props}>
        <div className="divider m-0"></div>
        <CardTitle className="text-sm font-semibold">
          {product.name.substring(0, 32) + "..."}
        </CardTitle>
        <CardDescription>
          {
            product.description.length > 50 ?
              product.description.substring(0, 100) + "..."
              : product.description
          }
        </CardDescription>
      </CardHeader>
      <CardFooter className="p-4 flex flex-col">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-end gap-1">
            <p className='text-md'>
              {product.currency}
              {product.price}
            </p>
            <p className='text-xs mb-1'>
              each
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="btn btn-outline btn-primary">
            <FiShoppingCart />
          </button>
        </div>
        <div className="w-full flex gap-2 justify-start items-end">
          <Rating size="md" withRating={false} value={Math.round(product?.averageRating)} />  {(Math.round(product?.averageRating)).toFixed(2)}
        </div>
      </CardFooter>
    </Card>

  ) : '';
}

ProductCard.propTypes = {};

export default ProductCard;
