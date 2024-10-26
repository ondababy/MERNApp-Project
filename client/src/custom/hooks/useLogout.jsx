import { confirmLogout } from '@custom/utils';
import { authApi, logout as logoutAction } from '@features';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useLogoutAction = () => {
  const dispatch = useDispatch();
  const [logout] = authApi.useLogoutMutation();

  const action = useCallback(async () => {
    await logout();
    dispatch(logoutAction());
  }, [dispatch, logout]);

  return action;
};

const useLogout = () => {
  const logout = useLogoutAction();
  const navigate = useNavigate();
  const handleLogout = useCallback(
    async (e) => {
      e?.preventDefault();
      confirmLogout(async () => {
        try {
          await logout();
          navigate('/login');
          toast.success('Logged out successfully');
        } catch (error) {
          if ([401, 403].includes(error?.status)) return toast.error('Logged out due to unauthorized access');
          toast.error(error?.data?.message || 'Logout failed');
        }
      });
    },
    [logout, navigate]
  );

  return handleLogout;
};
export default useLogout;
