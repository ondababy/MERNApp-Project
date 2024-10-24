import { ROLES } from '@app/constants';
import { authApi, setCredentials } from '@features';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLogoutAction } from './useLogout';

const isDev = import.meta.env.VITE_CLIENT_ENV === 'development';

export const useGetAuth = () => {
  const { userInfo, accessToken, role } = useSelector((state) => state.auth);
  return { userInfo, accessToken, role };
};

const useCheckAuth = (isPrivate = false) => {
  const location = useLocation();
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

  const checkPath = (path) => {
    const urlParams = new URLSearchParams(location.search);
    const paramsString = urlParams.toString();
    if (paramsString) path += `?${paramsString}`;
    if (location.pathname.startsWith(path)) return location.pathname;
    return path;
  }


  useEffect(() => {

    // Dashboard Access Control
    if (!isAdmin && isPrivate) logout();

    // User and private route
    else if (userInfo?.id && isPrivate) navigate(checkPath('/dashboard'));

    // Not email verified
    else if (userInfo?.id && !userInfo?.emailVerifiedAt) navigate(checkPath('/onboarding'));

    // No user and private route
    else if (!userInfo?.id && isPrivate || userInfo?.id && !accessToken) {
      logout();
      navigate('/login');
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
