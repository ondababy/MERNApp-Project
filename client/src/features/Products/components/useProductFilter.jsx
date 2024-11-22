import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useProductFilter = () => {
  const dispatch = useDispatch();
  const {
    queries,
    filters,
    minRangeInput,
    maxRangeInput,
    categorySearch
  } = useSelector((state) => state.product);
  const { products, fetchProducts } = useProductActions()
  const [qString, setQString] = useState('')

  useEffect(() => {
    console.log(qString)
  }, [qString]);


  return {
  };
};

export default useProductFilter;