
import isEqual from 'lodash/isEqual';

import { confirmSave, useFirebaseAuth } from '@custom';
import { setCredentials, setIsChanging } from '@features';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userApi } from '../user.api';
import { getAltFields, getFields } from '../user.fields';
import * as validator from '../user.validation';

export default function useUserActions({ id = null, action = "create", fields = null, altFields = null, onSave }) {
  /* DECLARATIONS #################################################### */
  const _fields = fields || (typeof getFields === 'function' ? getFields() : getFields);
  const _altFields = altFields || (typeof getAltFields === 'function' ? getAltFields() : getAltFields);

  /* DECLARATIONS #################################################### */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: oAuthUser } = useFirebaseAuth();

  const { userInfo, accessToken } = useSelector((state) => state.auth);
  const [createUser, { isLoading: isCreating }] = userApi.useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = userApi.useUpdateUserMutation();
  const [getUser, { isLoading: isFetching }] = userApi.useGetUserMutation();

  const [user, setUser] = useState(null);
  const [userSchema, setUserSchema] = useState(_fields);
  const [avatar, setAvatar] = useState({
    src: oAuthUser?.photoURL || "https://placehold.co/600",
    alt: oAuthUser?.displayName || "n/a",
    avatarChanged: false,
  })
  /* ############ #################################################### */
  // CAROUSEL
  const initialValues = useMemo(
    () =>
      userSchema.reduce((acc, field) => {
        acc[field.name] = action === 'create' ? '' : user?.[field.name] ?? '';
        return acc;
      }, {}),
    [user, userSchema, action]
  );

  const compareValues = (values) => {
    const isChanged = isEqual(initialValues, values);
    dispatch(setIsChanging({
      isChanging: !isChanged && !avatar.avatarChanged,
    }));
    return isChanged && !avatar.avatarChanged;
  }

  const onSubmit = async (values, actions) => {
    confirmSave(async () => handleSubmit(values, actions));
  };

  const handleSubmit = async (values, actions) => {
    const { username, email, password, confirm_password, ...info } = values
    const payload = { username, email, password, confirm_password, ...userInfo, info }
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
      if (userInfo?.id === userData?.id) {
        dispatch(setCredentials({
          userInfo: userData,
          token: accessToken,
        }));
      }
      onSave(userData);
    } catch (e) {
      const errors = e?.data?.errors?.details;
      if (Array.isArray(errors)) {
        errors.forEach((error) => {
          toast.error(error?.msg || 'Error');
        });
      } else toast.error(e?.data?.message || e.error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar({
        src: reader.result,
        alt: file.name,
        avatarChanged: true,
      });
    }
    reader.readAsDataURL(file);

  };


  useEffect(() => {
    console.clear();
    const names = oAuthUser?.displayName?.split(' ') || [];
    const oAuthInfo = {
      email: oAuthUser?.email || '',
      first_name: names.slice(0, -1).join(' ') || '',
      last_name: names[names.length - 1] || '',
      contact: oAuthUser?.phoneNumber || '',
      photoURL: oAuthUser?.photoURL || '',
    }

    if (action === 'edit' && id) {
      getUser(id).then((res) => {
        let { info, ...values } = res?.data?.resource
        if (oAuthUser) {
          info = { ...oAuthInfo, ...info }
        }
        const userData = { ...values, ...info }
        setUser(userData);
        console.log({ userData });
        if (userInfo?.id === id) {
          dispatch(setCredentials({
            userInfo: res?.data?.resource,
            token: accessToken,
          }));
        }
      });
    }
    setUserSchema(action === 'create' ? _fields : _altFields);

  }, [action, id, getUser, oAuthUser]);


  return {
    formikProps: {
      initialValues,
      validationSchema: validator.updateUser,
      enableReinitialize: true,
      onSubmit,
    },
    userSchema: userSchema.map(f => f.name === 'avatar' ? { ...f, onChange: handleImageUpload } : f),
    initialValues,
    isCreating,
    isUpdating,
    isFetching,
    handleSubmit,
    compareValues,
    handleImageUpload,
    avatar,
  }
}
