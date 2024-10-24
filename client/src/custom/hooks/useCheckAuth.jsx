import { ROLES } from '@app/constants';
import { authApi, setCredentials } from '@features';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutAction } from './useLogout';

const isDev = import.meta.env.VITE_CLIENT_ENV === 'development';

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
  const isAdmin = userInfo?.id && role === ROLES.ADMIN && accessToken || isDev;

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
    if (!userInfo?.id && accessToken && isPrivate)
      fetchUser();
  }, []);


  useEffect(() => {
    if (!isAdmin && isPrivate) {
      logout();
      navigate('/login')
    }
    else if (userInfo && !isPrivate) {
      navigate('/');
    } else if (!userInfo?.id && isPrivate) {
      navigate('/login');
    } else if (userInfo?.id && isPrivate) {
      navigate('/dashboard');
    }

  }, [navigate, isPrivate, userInfo, accessToken, logout]);

  return {
    userInfo,
    accessToken,
    role,
    isAdmin: isAdmin,
  };
};
export default useCheckAuth;
