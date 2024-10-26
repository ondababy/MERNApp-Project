

import { FormikForm } from '@common/components';
import { Button } from 'react-daisyui';
import useUserActions from '../hooks/useUserActions';
const avatarPlaceholder = {
  src: "https://placehold.co/600",
  alt: "n/a",
};

export default function UserForm({ id = null, action = 'create', noAvatar = false, ...props }) {

  const {
    formikProps,
    userSchema,
    isCreating,
    isUpdating,
    isFetching,
    handleSubmit,
    compareValues,
  } = useUserActions({ id, action, ...props });



  return (
    <div className="w-full flex justify-center p-4 lg:p-8">
      <FormikForm
        formikProps={formikProps}
        className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-6 gap-2 lg:gap-4"
        formSchema={userSchema}
        element={({ isSubmitting, values }) => {
          const isFormChanged = !(compareValues(values));
          const isButtonDisabled = isSubmitting || isCreating || isUpdating || isFetching || !isFormChanged;

          return (
            <>
              {
                !noAvatar &&
                <div className="w-full h-64 p-4 row-start-2 row-span-4 col-span-3 rounded flex justify-center">
                  <img src={avatarPlaceholder.src} alt={avatarPlaceholder.alt} className='h-full shadow-xl rounded-full object-contain bg-base-100 aspect-square bg-blend-lighten ' />
                </div>
              }

              <div className="w-full col-span-3 md:col-span-6">
                <Button
                  variant="outline"
                  type="submit"
                  color="primary"
                  className="max-w-md"
                  disabled={isButtonDisabled}
                >
                  {action === 'create' ? 'Save' : 'Save'}
                </Button>
              </div>

            </>
          );
        }}
      />
    </div>
  );
};

