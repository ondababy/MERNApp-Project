import { PaginationComponent, useQueries } from '@custom';
import React from 'react';
import ProductCard from './ProductCard';
import useProductFilter from './useProductFilter';


function ProductGrid() {
  /* DECLARATIONS #################################################### */
  const {
    qString,
    products,
    paginate,
    fetchProducts,
  } = useProductFilter()

  React.useEffect(() => {
    fetchProducts(qString);
  }, []);





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
          last={paginate.last}
          current={paginate.current}
          onChange={(page) => handlePaginate(page)}
        />
      </div>
    </div>
  )
}

export default ProductGrid;
