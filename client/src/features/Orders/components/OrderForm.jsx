
import isEqual from 'lodash/isEqual';

import { FormikForm } from '@common/components';
import { Button } from 'react-daisyui';
import { useOrderActions } from '../hooks/useOrderActions';

export default function OrderForm({ action = 'create', onSubmit = () => { }, submitButton = false }) {
  const orderHook = useOrderActions({ cartData: {}, action });


  return (
    <div className="w-full flex justify-center">
      <FormikForm
        formSchema={orderHook.orderSchema}
        formikProps={orderHook.formikProps}
        className="w-full grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-4"
        element={({ isSubmitting, values }) => {
          const isFormChanged = !isEqual(orderHook.initialValues, values);
          const isProcessing = isSubmitting || orderHook.isCreating || orderHook.isUpdating;
          const isButtonDisabled = isProcessing || orderHook.isFetching || !isFormChanged;

          return submitButton && (
            <div className="w-full col-span-3 md:col-span-3 lg:col-span-2 ">
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
  );
};

