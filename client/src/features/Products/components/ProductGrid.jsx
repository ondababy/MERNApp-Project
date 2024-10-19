import { PaginationComponent } from '@custom';
import ProductCard from './ProductCard';

function ProductGrid() {
  return (
    <div className="flex flex-col h-full">
      <div className="my-8 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {
          Array(6).fill().map((_, i) => (
            <ProductCard key={i} />
          ))
        }

      </div>
      {/* Pagination */}
      <div className="mt-auto">
        <PaginationComponent />
      </div>
    </div>
  )
}

export default ProductGrid;
