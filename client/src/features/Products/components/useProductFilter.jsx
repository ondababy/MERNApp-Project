import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productApi } from '../product.api';
import { setQueries } from '../product.slice';

const useProductFilter = () => {
  const dispatch = useDispatch();
  const [paginate, setPaginate] = useState({
    current: 1,
    last: 1,
  });
  const productQuery = useSelector((state) => state.product);
  const [products, setProducts] = useState([]);
  const [getFiltered] = productApi.useGetFilteredMutation();

  const fetchProducts = async (queries) => {
    if (!queries) queries = productQuery;
    return getFiltered(queries).then(({ data }) => {
      setProducts(data.resource || []);
      setPaginate({
        current: data?.meta?.page || 1,
        last: data?.meta?.last_page || 1,
      });
    });
  }

  useEffect(() => {
    console.log('Query changed: ', productQuery);
    fetchProducts();
  }, [productQuery]);

  const handlePaginate = page => {
    dispatch(setQueries({ page }));
    setPaginate({ ...paginate, current: page });
  };

  return {
    productQuery,
    products,
    paginate,
    setPaginate,
    handlePaginate,
    fetchProducts,
  };
};

export default useProductFilter;