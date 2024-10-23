import { ROLES } from '@app/constants';
import { authApi, setCredentials } from '@features';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutAction } from './useLogout';

export const useGetAuth = () => {
  const { userInfo, accessToken, role } = useSelector((state) => state.auth);
  return { userInfo, accessToken, role };
};

const useCheckAuth = (isPrivate = false) => {
  const dispatch = useDispatch();
  const logout = useLogoutAction();
  const navigate = useNavigate();

  const { userInfo, accessToken, role } = useSelector((state) => state.auth);
  const [profile] = authApi.useProfileMutation();

  const fetchUser = async () => {
    const res = await profile().unwrap();
    res && dispatch(
      setCredentials({
        userInfo: res?.user,
        token: res?.token,
      })
    );
  };



  useEffect(() => {
    userInfo?.id && fetchUser();
  }, [userInfo]);


  useEffect(() => {
    const isDevelopment = import.meta.env.CLIENT_ENV === 'development';
    const isAdmin = userInfo?.id && role === ROLES.ADMIN && accessToken && !isDevelopment;
    console.log(userInfo?.id && role === ROLES.ADMIN && accessToken && !isDevelopment)
    if (!isAdmin && isPrivate) {
      return logout().finally(() => navigate('/login'));
    }
    if (userInfo && !isPrivate) {
      return navigate('/');
    } else if (!userInfo?.id && isPrivate) {
      return navigate('/login');
    } else if (userInfo?.id && isPrivate) {
      return navigate('/dashboard');
    }

  }, [navigate, isPrivate, userInfo, accessToken, logout]);

  return {
    userInfo,
    accessToken,
    role,
    isAdmin: userInfo?.id && role === ROLES.ADMIN,
  };
};
export default useCheckAuth;
