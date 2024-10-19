import { PaginationComponent } from '@custom';
import ProductCard from './ProductCard';

const products = [
  // {
  //   id: 1,
  //   name: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //   description: "Doloremque quae optio sint quam quos fugit et maiores tenetur? Voluptatibus ipsum veritatis a eum, impedit non minima provident explicabo sint similique!",
  //   price: 100.0,
  //   currency: "PHP",
  //   images: [
  //     {
  //       src: 'https://placehold.co/600?text=n/a',
  //       alt: 'n/a',
  //     },
  //   ]
  // }
]

function ProductGrid() {
  return (
    <div className="flex flex-col h-full">
      <div className="my-8 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {
          products?.length ? products?.flat().map((product, i) => (
            <ProductCard key={i} product={product} />
          )) : ''
        }

      </div>

      {/* Pagination */}
      <div className="mt-auto">
        <PaginationComponent
          last={products.length}
          current={1}
          onChange={(page) => { }}
        />
      </div>
    </div>
  )
}

export default ProductGrid;
