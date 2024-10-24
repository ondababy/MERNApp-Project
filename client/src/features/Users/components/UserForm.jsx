
import isEqual from 'lodash/isEqual';

import { FormikForm } from '@common/components';
import { Button } from 'react-daisyui';
import useUserActions from '../hooks/useUserActions';

export default function UserForm({ action = 'create' }) {
  const {
    formikProps,
    userSchema,
    initialValues,
    isCreating,
    isUpdating,
    isFetching,
    handleSubmit
  } = useUserActions(action);


  return (
    <div className="container p-8">
      <FormikForm
        formikProps={formikProps}
        className="flex flex-wrap gap-8"
        formSchema={userSchema}
        element={({ isSubmitting, values }) => {
          const isFormChanged = !isEqual(initialValues, values);
          const isButtonDisabled = isSubmitting || isCreating || isUpdating || isFetching || !isFormChanged;

          return (
            <div className="flex w-full">
              <Button
                variant="outline"
                type="button"
                onClick={handleSubmit(values)}
                color="primary"
                className="max-w-md"
                disabled={isButtonDisabled}
              >
                {action === 'create' ? 'Create User' : 'Update User'}
              </Button>
            </div>
          );
        }}
      />
    </div>
  );
};

