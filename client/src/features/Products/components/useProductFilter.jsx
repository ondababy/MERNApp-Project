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

  const fetchProducts = async (queries, reset = true) => {
    if (!queries) queries = productQuery;
    dispatch(setSilentLoading(true));
    return getFiltered(queries).then(({ data }) => {
      setProducts(prev => reset ? data?.resource || [] : removeDuplicates([...prev, ...data?.resource || []]));
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
    dbs(productQuery);
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