import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useProductActions from './useProductActions';

const useProductFilter = () => {
  const dispatch = useDispatch();
  const [paginate, setPaginate] = useState({
    current: 1,
    last: 1,
  });
  const {
    queries,
    filters,
    minRangeInput,
    maxRangeInput,
    categorySearch
  } = useSelector((state) => state.product);
  const { products, fetchProducts } = useProductActions()
  const [qString, setQString] = useState('')

  const _fetchProducts = async (qStr) => {
    fetchProducts(qStr).then((res) => {
      setPaginate({
        current: res?.meta.page,
        last: res?.meta.last_page,
      });
    });
  }

  useEffect(() => {
    console.log(qString)
  }, [qString]);

  const handlePaginate = page => {
    const newQuery = {
      ...query.queries,
      page: page,
    }
    setPaginate({ ...paginate, current: page });
    _fetchProducts();

  };

  return {
    qString,
    products,
    paginate,
    setPaginate,
    setQString,
    handlePaginate,
    fetchProducts: _fetchProducts,
  };
};

export default useProductFilter;