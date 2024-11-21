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
import { wishlistApi } from '../wishlist.api';
import { getAltFields, getFields } from '../wishlist.fields';
import { wishlistValidation } from '../wishlist.validation';
import WishlistWrapper from './WishlistWrapper';

const WishlistForm = ({ title = 'Wishlist Form', action = 'create' }) => {

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
  const [wishlist, setWishlist] = useState(null);
  const [wishlistSchema, setWishlistSchema] = useState(fields);
  const [createWishlist, { isLoading: isCreating }] = wishlistApi.useCreateWishlistMutation();
  const [updateWishlist, { isLoading: isUpdating }] = wishlistApi.useUpdateWishlistMutation();
  const [getWishlist, { isLoading: isFetching }] = wishlistApi.useGetWishlistMutation();
  const { slug, setSlug } = useSlug();
  /* END DECLARATIONS ################################################ */

  const initialValues = useMemo(
    () =>
      wishlistSchema.reduce((acc, field) => {
        acc[field.name] = action === 'create' ? '' : wishlist?.[field.name] ?? '';
        return acc;
      }, {}),
    [wishlist, wishlistSchema, action]
  );

  const handleCreate = async (values) => {
    await createWishlist(values).unwrap();
    navigate('/dashboard/wishlists/table');
    toast.success('Create successful!');
  };

  const handleUpdate = async (values) => {
    const res = await updateWishlist({ id: wishlist.id, wishlist: values }).unwrap();
    const updatedWishlist = res?.resource || { ...wishlist, ...values };
    setSlug(updatedWishlist.slug);
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
    const fetchWishlist = async () => {
      getWishlist(slug).then((res) => {
        if (res.error) {
          toast.error(res.error.data.message);
          navigate('/dashboard/wishlists/table');
        } else if (res.data) setWishlist(res.data.resource);
      });
    };

    if (slug) fetchWishlist();
    else setWishlistSchema(action === 'create' ? fields : altFields);
  }, [action, slug, getWishlist, navigate]);

  return (
    <WishlistWrapper
      title={title}
      prevUrl="/dashboard/wishlists/table"
    >

      <div className="flex flex-col gap-4 lg:flex-row items-center lg:items-start">

        {/* CAROUSEL */}
        <div className="container lg:w-1/3 w-96">
          <CarouselComponent images={
            wishlist?.images?.length ?
              wishlist?.images.map((image) => ({ src: image.url, alt: image.alt }))
              : images} />
        </div>

        <div className="container w-2/3">
          <FormikForm
            formSchema={wishlistSchema}
            formikProps={{
              initialValues,
              validationSchema: wishlistValidation,
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
                    {action === 'create' ? 'Create Wishlist' : 'Update Wishlist'}
                  </Button>
                </div>
              );
            }}
          />
        </div>
      </div>
    </WishlistWrapper>
  );
};

WishlistForm.propTypes = {
  action: PropTypes.oneOf(['create', 'edit', 'view']),
  title: PropTypes.string,
};

export default WishlistForm;
