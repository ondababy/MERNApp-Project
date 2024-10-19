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
import { transactionApi } from '../transaction.api';
import { getAltFields, getFields } from '../transaction.fields';
import { transactionValidation } from '../transaction.validation';
import TransactionWrapper from './TransactionWrapper';

const fields = typeof getFields === 'function' ? getFields() : getFields || [];
const altFields = typeof getAltFields === 'function' ? getAltFields() : getAltFields || [];
// CAROUSEL
const images = [
  {
    src: "https://placehold.co/600",
    alt: "n/a",
  },
]

const TransactionForm = ({ title = 'Transaction Form', action = 'create' }) => {
  /* DECLARATIONS #################################################### */
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [transactionSchema, setTransactionSchema] = useState(fields);
  const [createTransaction, { isLoading: isCreating }] = transactionApi.useCreateTransactionMutation();
  const [updateTransaction, { isLoading: isUpdating }] = transactionApi.useUpdateTransactionMutation();
  const [getTransaction, { isLoading: isFetching }] = transactionApi.useGetTransactionMutation();
  const { slug, setSlug } = useSlug();
  /* END DECLARATIONS ################################################ */

  const initialValues = useMemo(
    () =>
      transactionSchema.reduce((acc, field) => {
        acc[field.name] = action === 'create' ? '' : transaction?.[field.name] ?? '';
        return acc;
      }, {}),
    [transaction, transactionSchema, action]
  );

  const handleCreate = async (values) => {
    await createTransaction(values).unwrap();
    navigate('/dashboard/transactions/table');
    toast.success('Create successful!');
  };

  const handleUpdate = async (values) => {
    const res = await updateTransaction({ id: transaction.id, transaction: values }).unwrap();
    const updatedTransaction = res?.resource || { ...transaction, ...values };
    setSlug(updatedTransaction.slug);
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
    const fetchTransaction = async () => {
      getTransaction(slug).then((res) => {
        if (res.error) {
          toast.error(res.error.data.message);
          navigate('/dashboard/transactions/table');
        } else if (res.data) setTransaction(res.data.resource);
      });
    };

    if (slug) fetchTransaction();
    else setTransactionSchema(action === 'create' ? fields : altFields);
  }, [action, slug, getTransaction, navigate]);

  return (
    <TransactionWrapper
      title={title}
      prevUrl="/dashboard/transactions/table"
    >

      <div className="flex flex-col gap-4 lg:flex-row items-center lg:items-start">

        {/* CAROUSEL */}
        <div className="container lg:w-1/3 w-96">
          <CarouselComponent images={
            transaction?.images?.length ?
              transaction?.images.map((image) => ({ src: image.url, alt: image.alt }))
              : images} />
        </div>

        <div className="container w-2/3">
          <FormikForm
            formSchema={transactionSchema}
            formikProps={{
              initialValues,
              validationSchema: transactionValidation,
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
                    {action === 'create' ? 'Create Transaction' : 'Update Transaction'}
                  </Button>
                </div>
              );
            }}
          />
        </div>
      </div>
    </TransactionWrapper>
  );
};

TransactionForm.propTypes = {
  action: PropTypes.oneOf(['create', 'edit', 'view']),
  title: PropTypes.string,
};

export default TransactionForm;
