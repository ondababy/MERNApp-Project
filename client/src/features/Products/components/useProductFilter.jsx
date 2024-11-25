import { setSilentLoading } from '@app/slices';
import { debounce } from '@custom';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productApi } from '../product.api';
import { setQueries } from '../product.slice';

const useProductFilter = () => {
  const dispatch = useDispatch();
  const productQuery = useSelector((state) => state.product);
  const { silentLoading } = useSelector(state => state.loading);

  const [getFiltered] = productApi.useGetFilteredMutation();

  const [products, setProducts] = useState([]);
  const [paginate, setPaginate] = useState({
    current: 1,
    last: 1,
  });

  const removeDuplicates = (arr) => {
    return arr.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
  }

  const filterProducts = (products) => {
    return products.filter(product => {
      // Handle category search
      if (productQuery.categorySearch && !product.category.toLowerCase().includes(productQuery.categorySearch.toLowerCase())) {
        return false;
      }

      // Handle categories filter
      if (productQuery.filters.categories.length > 0 && !productQuery.filters.categories.includes(product.category)) {
        return false;
      }

      // Handle price filter
      if (productQuery.filters.price.length > 0) {
        const priceRange = productQuery.filters.price.map(range => productQuery.priceRanges[range]);
        const isInPriceRange = priceRange.some(range => {
          const { $gt, $lte } = range;
          return product.price > $gt && (typeof $lte === 'undefined' || product.price <= $lte);
        });
        if (!isInPriceRange) {
          return false;
        }
      }

      // Handle rating filter
      if (productQuery.filters.rating && product.averageRating < productQuery.filters.rating) {
        return false;
      }

      // Handle general search query
      if (productQuery.queries.q && !product.name.toLowerCase().includes(productQuery.queries.q.toLowerCase())) {
        return false;
      }

      return true;
    });
  };

  const fetchProducts = async (queries, reset = false) => {
    if (!queries) queries = productQuery;
    dispatch(setSilentLoading(true));
    return getFiltered(queries).then(({ data }) => {
      setProducts(prev => filterProducts(reset ? data?.resource || [] : removeDuplicates([...prev, ...data?.resource || []])));
      setPaginate({
        ...data?.meta,
        current: data?.meta?.page || 1,
        last: data?.meta?.last_page || 1,
      });
      dispatch(setSilentLoading(false));
    });
  }
  const dbs = useCallback(debounce(fetchProducts, 500), [fetchProducts]);

  useEffect(() => {
    fetchProducts(productQuery, true);
  }, [productQuery]);

  const handlePaginate = page => {
    dispatch(setQueries({ page }));
    setPaginate({ ...paginate, current: page });
  };
  const autoPaginate = () => {
    dispatch(setQueries(({ ...productQuery.queries, page: productQuery.queries.page + 1 })));
    setPaginate(prev => ({ ...prev, current: prev.current + 1 }));
  }

  return {
    productQuery,
    products,
    paginate,
    setPaginate,
    handlePaginate,
    fetchProducts,
    autoPaginate
  };
};

export default useProductFilter;