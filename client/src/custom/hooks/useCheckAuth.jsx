import { ROLES } from '@app/constants';
import { authApi, setCredentials } from '@features';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutAction } from './useLogout';

export const useGetAuth = () => {
  const { userInfo, accessToken } = useSelector((state) => state.auth);
  return { userInfo, accessToken };
};

const useCheckAuth = (isPrivate = false) => {
  const dispatch = useDispatch();
  const [profile] = authApi.useProfileMutation();
  const [getRole] = authApi.useGetRoleMutation();
  const { userInfo, accessToken } = useSelector((state) => state.auth);
  const [user, setUser] = useState(userInfo);
  const [role, setRole] = useState(null);
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
  const fetchRole = async () => {
    const res = await getRole().unwrap();
    setRole(res);
    dispatch(
      setCredentials({
        userInfo: res.user,
        token: res.token,
      })
    );
  };


  useEffect(() => {
    fetchUser();
    fetchRole();
  }, []);


  useEffect(() => {
    const isAdmin = (isPrivate && !user?.role !== ROLES.ADMIN)
    if ((!accessToken && userInfo)) {
      logout();
      return navigate('/');
    }
    if (user && !isPrivate) {
      return navigate('/');
    } else if (!user?.id && isPrivate) {
      return navigate('/login');
    }

  }, [navigate, user, isPrivate, userInfo, accessToken, logout]);

  return isPrivate || user?.id ? user : null;
};
export default useCheckAuth;
