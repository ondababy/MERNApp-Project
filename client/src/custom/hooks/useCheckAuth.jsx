import { ROLES } from '@app/constants';
import { authApi, setCredentials } from '@features';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutAction } from './useLogout';

export const useGetAuth = () => {
  const { userInfo, accessToken, role } = useSelector((state) => state.auth);
  return { userInfo, accessToken, role };
};

const useCheckAuth = (isPrivate = false) => {
  const dispatch = useDispatch();
  const [profile] = authApi.useProfileMutation();
  const { userInfo, accessToken, role } = useSelector((state) => state.auth);
  const [user, setUser] = useState(userInfo);
  const logout = useLogoutAction();
  const navigate = useNavigate();

  const fetchUser = async () => {
    const res = await profile().unwrap();
    setUser(res.user);
    dispatch(
      setCredentials({
        userInfo: res.user,
        token: res.token,
      })
    );
  };



  useEffect(() => {
    fetchUser();
  }, []);


  useEffect(() => {
    const isAdmin = (isPrivate && role !== ROLES.ADMIN)
    console.log('isAdmin', isAdmin)
    if ((!accessToken && userInfo) || isAdmin) {
      logout();
      return navigate('/');
    }
    if (user && !isPrivate) {
      return navigate('/');
    } else if (!user?.id && isPrivate) {
      return navigate('/login');
    } else if (user?.id && isPrivate) {
      return navigate('/dashboard');
    }

  }, [navigate, user, isPrivate, userInfo, accessToken, logout]);

  return isPrivate || user?.id ? user : null;
};
export default useCheckAuth;
