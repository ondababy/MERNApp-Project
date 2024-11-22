
import { useSlug } from '@common';
import { confirmSave, requestError, toFormData } from '@custom';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { productApi } from '../product.api';
import { getAltFields, getFields } from '../product.fields';

const fields = typeof getFields === 'function' ? getFields() : getFields || [];
const altFields = typeof getAltFields === 'function' ? getAltFields() : getAltFields || [];

const images = [
  {
    src: "https://placehold.co/600",
    alt: "n/a",
  },
]

const useProductActions = ({ id, action = 'create' }) => {

  /* DECLARATIONS #################################################### */
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [previewImages, setPreviewImages] = useState(images);
  const [productSchema, setProductSchema] = useState(fields);
  const [createProduct, { isLoading: isCreating }] = productApi.useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = productApi.useUpdateProductMutation();
  const [getProduct, { isLoading: isFetching }] = productApi.useGetProductMutation();
  const { slug, setSlug } = useSlug();

  const initialValues = useMemo(
    () =>
      productSchema.reduce((acc, field) => {
        acc[field.name] = action === 'create' ? '' : product?.[field.name] ?? '';
        return acc;
      }, {}),
    [product, productSchema, action]
  );
  /* END DECLARATIONS ################################################ */
  const fetchProduct = async () => {
    return getProduct(slug).then((res) => {
      if (res.error) {
        toast.error(res.error.data.message);
        navigate('/dashboard/products/table');
      } else if (res.data) setProduct(res.data.resource);
    });
  };

  const handleImageInput = (e) => {
    const files = e.target.files;
    const images = Array.from(files).map((file) => {
      return {
        src: URL.createObjectURL(file),
        alt: file.name,
        file,
      };
    });

    setPreviewImages(images);
  }

  const handleCreate = async (values) => {
    await createProduct(values).unwrap();
    navigate('/dashboard/products/table');
    toast.success('Create successful!');
  };

  const handleUpdate = async (values) => {
    const res = await updateProduct({ id: product.id, product: values }).unwrap();
    const updatedProduct = res?.resource || { ...product, ...values };
    setSlug(updatedProduct.slug);
    toast.success('Update successful!');
  };

  const onSubmit = async (values) => {
    confirmSave(async () => handleSubmit(values));
  };

  const handleSubmit = async (values) => {
    try {
      values = toFormData(values);
      if (action === 'create') await handleCreate(values);
      else await handleUpdate(values);
    } catch (error) {
      requestError(error);
    }
  };


  return {
    slug,
    product,
    initialValues,
    productSchema,
    previewImages,
    isCreating,
    isUpdating,
    isFetching,
    setSlug,
    setProductSchema,
    fetchProduct,
    handleImageInput,
    onSubmit,
    handleSubmit
  };
};

export default useProductActions;