
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userApi } from '../user.api';
import { getAltFields, getFields } from '../user.fields';
import { userValidation } from '../user.validation';

export default function useUserActions({ id = null, action = "create", fields = null, altFields = null }) {
  /* DECLARATIONS #################################################### */
  const _fields = fields || typeof getFields === 'function' ? getFields() : getFields;
  const _altFields = altFields || typeof getAltFields === 'function' ? getAltFields() : getAltFields;
  // CAROUSEL
  const images = [
    {
      src: "https://placehold.co/600",
      alt: "n/a",
    },
  ]

  /* DECLARATIONS #################################################### */
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userSchema, setUserSchema] = useState(_fields);
  const [createUser, { isLoading: isCreating }] = userApi.useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = userApi.useUpdateUserMutation();
  const [getUser, { isLoading: isFetching }] = userApi.useGetUserMutation();
  /* ############ #################################################### */
  const initialValues = useMemo(
    () =>
      userSchema.reduce((acc, field) => {
        acc[field.name] = action === 'create' ? '' : user?.[field.name] ?? '';
        return acc;
      }, {}),
    [user, userSchema, action]
  );


  useEffect(() => {
    if (action === 'edit' && id) {
      getUser(id).then((res) => {
        setUser(res.data.resource);
      });
    }
    setUserSchema(action === 'create' ? _fields : _altFields);

  }, [action, id, getUser]);

  const handleSubmit = (values) => async () => {
    const { username, email, password, confirm_password, ...info } = values
    const payload = { username, email, password, confirm_password, info }
    console.log(payload)
    try {
      if (action === 'create') {
        // await createUser(values).unwrap();
        toast.success('User created successfully');
      } else {
        // await updateUser({ id, user: values }).unwrap();
        toast.success('User updated successfully');
      }
    } catch (e) {
      const errors = e?.data?.errors?.details;
      if (Array.isArray(errors)) {
        errors.forEach((error) => {
          toast.error(error?.msg || 'test');
        });
      } else toast.error(e?.data?.message || e.error);
    }
  };

  return {
    formikProps: {
      initialValues,
      validationSchema: userValidation,
      enableReinitialize: true,
    },
    userSchema,
    initialValues,
    isCreating,
    isUpdating,
    isFetching,
    handleSubmit
  }
}
