
import isEqual from 'lodash/isEqual';

import { FormikForm } from '@common/components';
import { Button } from 'react-daisyui';
import { useOrderActions } from '../hooks/useOrderActions';

export default function OrderForm({ action = 'create' }) {
  const orderHook = useOrderActions({ cartData: {}, action });


  return (
    <div className="flex flex-col gap-4 lg:flex-row items-center lg:items-start">
      <div className="container w-2/3">
        <FormikForm
          formSchema={orderHook.orderSchema}
          formikProps={orderHook.formikProps}
          className="grid grid-col-6 gap-8"
          element={({ isSubmitting, values }) => {
            const isFormChanged = !isEqual(orderHook.initialValues, values);
            const isProcessing = isSubmitting || orderHook.isCreating || orderHook.isUpdating;
            const isButtonDisabled = isProcessing || orderHook.isFetching || !isFormChanged;

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
                  {action === 'create' ? 'Create Order' : 'Update Order'}
                </Button>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

