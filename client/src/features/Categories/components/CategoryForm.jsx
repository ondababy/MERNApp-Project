import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';

import { useSlug } from '@common';
import { FormikForm } from '@common/components';
import { confirmSave, requestError, toFormData } from '@custom';
import { CarouselComponent } from '@custom/components'; // CAROUSEL
import { useEffect, useMemo, useState } from 'react';
import { Button } from 'react-daisyui';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { categoryApi } from '../category.api';
import { getAltFields, getFields } from '../category.fields';
import { categoryValidation } from '../category.validation';
import CategoryWrapper from './CategoryWrapper';

const CategoryForm = ({ title = 'Category Form', action = 'create' }) => {

  /* DECLARATIONS #################################################### */
  const fields = typeof getFields === 'function' ? getFields() : getFields || [];
  const altFields = typeof getAltFields === 'function' ? getAltFields() : getAltFields || [];
  const images = [
    {
      src: "https://placehold.co/600",
      alt: "n/a",
    },
  ]

  /* DECLARATIONS #################################################### */
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [categorySchema, setCategorySchema] = useState(fields);
  const [previewImages, setPreviewImages] = useState(images);
  const [createCategory, { isLoading: isCreating }] = categoryApi.useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = categoryApi.useUpdateCategoryMutation();
  const [getCategory, { isLoading: isFetching }] = categoryApi.useGetCategoryMutation();
  const { slug, setSlug } = useSlug();
  /* END DECLARATIONS ################################################ */
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
  const initialValues = useMemo(
    () =>
      categorySchema.reduce((acc, field) => {
        acc[field.name] = action === 'create' ? '' : category?.[field.name] ?? '';
        return acc;
      }, {}),
    [category, categorySchema, action]
  );

  const handleCreate = async (values) => {
    await createCategory(values).unwrap();
    navigate('/dashboard/categories/table');
    toast.success('Create successful!');
  };

  const handleUpdate = async (values) => {
    const res = await updateCategory({ id: category.id, category: values }).unwrap();
    const updatedCategory = res?.resource || { ...category, ...values };
    setSlug(updatedCategory.slug);
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

  useEffect(() => {
    const fetchCategory = async () => {
      getCategory(slug).then((res) => {
        if (res.error) {
          toast.error(res.error.data.message);
          navigate('/dashboard/categories/table');
        } else if (res.data) setCategory(res.data.resource);
      });
    };

    if (slug) fetchCategory();
    else setCategorySchema(action === 'create' ? fields : altFields);
  }, [action, slug, getCategory, navigate]);

  return (
    <CategoryWrapper
      title={title}
    >

      <div className="flex flex-col gap-4 lg:flex-row items-center lg:items-start">

        {/* CAROUSEL */}
        <div className="container lg:w-1/3 w-96">
          <CarouselComponent images={
            category?.images?.length ?
              category?.images.map((image) => ({ src: image.url, alt: image.alt }))
              : previewImages} />
        </div>

        <div className="container w-2/3">
          <FormikForm
            formSchema={categorySchema.map(f => f.name === 'image' ? { ...f, onChange: handleImageInput } : f)}
            formikProps={{
              initialValues,
              validationSchema: categoryValidation,
              onSubmit: onSubmit,
              enableReinitialize: true,
            }}
            className="flex flex-wrap gap-8"
            element={({ isSubmitting, values }) => {
              const isFormChanged = !isEqual(initialValues, values);
              const isProcessing = isSubmitting || isCreating || isUpdating;
              const isButtonDisabled = isProcessing || isFetching || !isFormChanged;

              return (
                <div className="flex w-full">
                  <Button
                    variant="outline"
                    type="submit"
                    color="primary"
                    className="max-w-md"
                    disabled={isButtonDisabled}
                  >
                    {isProcessing && <span className="loading loading-spinner"></span>}
                    {action === 'create' ? 'Create Category' : 'Update Category'}
                  </Button>
                </div>
              );
            }}
          />
        </div>
      </div>
    </CategoryWrapper>
  );
};

CategoryForm.propTypes = {
  action: PropTypes.oneOf(['create', 'edit', 'view']),
  title: PropTypes.string,
};

export default CategoryForm;
