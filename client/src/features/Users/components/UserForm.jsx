

import { FormikForm } from '@common/components';
import { Button } from 'react-daisyui';
import useUserActions from '../hooks/useUserActions';


export default function UserForm({ id = null, action = 'create', noAvatar = false, ...props }) {

  const {
    formikProps,
    userSchema,
    isCreating,
    isUpdating,
    isFetching,
    compareValues,
    avatar,
    handleImageUpload,
  } = useUserActions({ id, action, ...props });



  return (
    <div className="w-full flex justify-center p-4 lg:p-8">
      <FormikForm
        formikProps={formikProps}
        formSchema={userSchema}
        className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-6 gap-2 lg:gap-4"
        element={({ isSubmitting, values }) => {
          const isFormChanged = !(compareValues(values));
          const isButtonDisabled = isSubmitting || isCreating || isUpdating || isFetching || !isFormChanged;

          return (
            <>
              {
                !noAvatar &&
                <div className='row-start-2 row-span-4 col-span-3 flex flex-col items-center justify-center gap-2'>
                  <div className="w-full h-64 p-4  rounded flex justify-center">
                    <img src={avatar.src} alt={avatar.alt} className='h-full shadow-xl rounded-full object-contain bg-base-100 aspect-square bg-blend-lighten ' />
                  </div>
                  {/* Image Upload Button */}

                  <label htmlFor="avatar-upload" className="btn btn-sm btn-outline btn-primary">
                    Change Photo
                  </label>

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

