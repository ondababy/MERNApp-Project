import { FormikForm } from '@common/components';
import { PageTitle } from '@partials';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { Button } from 'react-daisyui';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userApi } from '../user.api';
import { userValidation } from '../user.validation';

const UserForm = ({ title = 'User Form', action = 'create' }) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userSchema, setUserSchema] = useState([
    { label: 'Username', name: 'username', type: 'text' },
    { label: 'Email Address', name: 'email', type: 'email' },
  ]);
  const navigate = useNavigate();
  const [createUser, { isLoading: isCreating }] = userApi.useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = userApi.useUpdateUserMutation();
  const [getUser, { isLoading: isFetching }] = userApi.useGetUserMutation();

  useEffect(() => {
    if (action === 'edit' && id) {
      getUser(id).then((res) => {
        setUser(res.data.resource);
      });
    } else {
      setUserSchema([
        { label: 'Username', name: 'username', type: 'text' },
        { label: 'Email Address', name: 'email', type: 'email' },
        { label: 'Password', name: 'password', type: 'password' },
        { label: 'Confirm Password', name: 'confirm_password', type: 'password' },
      ]);
    }
  }, [action, id, getUser]);

  const initialValues = useMemo(
    () =>
      userSchema.reduce((acc, field) => {
        acc[field.name] = action === 'create' ? '' : user?.[field.name] ?? '';
        return acc;
      }, {}),
    [user, userSchema, action]
  );

  const handleSubmit = (values) => async () => {
    try {
      if (action === 'create') {
        await createUser(values).unwrap();
        toast.success('User created successfully');
      } else {
        await updateUser({ id, user: values }).unwrap();
        toast.success('User updated successfully');
      }
      // navigate('/dashboard/users/table');
    } catch (e) {
      const errors = e?.data?.errors?.details;
      if (Array.isArray(errors)) {
        errors.forEach((error) => {
          toast.error(error?.msg || 'test');
        });
      } else toast.error(e?.data?.message || e.error);
    }
  };

  return (
    <div className="w-full h-full">
      <PageTitle title={title} />

      <div className="container p-8">
        <FormikForm
          formikProps={{
            initialValues,
            validationSchema: userValidation,
            enableReinitialize: true,
          }}
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
    </div>
  );
};

UserForm.propTypes = {
  action: PropTypes.oneOf(['create', 'edit', 'view']),
  title: PropTypes.string,
};

export default UserForm;
