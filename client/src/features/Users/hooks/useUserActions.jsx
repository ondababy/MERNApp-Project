
import { confirmSave } from '@custom';
import { authApi, setCredentials } from '@features';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userApi } from '../user.api';
import { getAltFields, getFields } from '../user.fields';
import * as validator from '../user.validation';

export default function useUserActions({ id = null, action = "create", fields = null, altFields = null, onSave }) {
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
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
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
        const { info, ...values } = res?.data?.resource
        const userData = { ...values, ...info }
        setUser(userData);
        if (userInfo?.id === id) {
          dispatch(setCredentials({
            userInfo: res?.data?.resource,
          }));
        }
      });
    }
    setUserSchema(action === 'create' ? _fields : _altFields);

  }, [action, id, getUser]);

  const onSubmit = async (values, actions) => {
    confirmSave(async () => handleSubmit(values, actions));
  };
  const handleSubmit = async (values, actions) => {
    const { username, email, password, confirm_password, ...info } = values
    const payload = { username, email, password, confirm_password, info }
    try {
      let res;
      if (action === 'create') {
        res = await createUser(payload).unwrap();
        toast.success('User created successfully');
      } else {
        res = await updateUser({ id, user: payload }).unwrap();
        toast.success('User updated successfully');
      }
      const userData = res?.user;
      if (!userData) return
      if (userInfo?.id === userData?.id) {
        dispatch(setCredentials({
          userInfo: userData,
        }));
      }
    } catch (e) {
      const errors = e?.data?.errors?.details;
      if (Array.isArray(errors)) {
        errors.forEach((error) => {
          toast.error(error?.msg || 'Error');
        });
      } else toast.error(e?.data?.message || e.error);
    }
  };

  return {
    formikProps: {
      initialValues,
      validationSchema: validator.updateUser,
      enableReinitialize: true,
      onSubmit,
    },
    userSchema,
    initialValues,
    isCreating,
    isUpdating,
    isFetching,
    handleSubmit
  }
}
