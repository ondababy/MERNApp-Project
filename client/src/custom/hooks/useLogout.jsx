import { clearNotifications } from "@app/slices";
import { useFirebaseAuth } from '@custom';
import { confirmLogout } from '@custom/utils';
import { authApi, clearCart, clearOrder, logout as logoutAction } from '@features';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useLogoutAction = () => {

  const dispatch = useDispatch();
  const [logout] = authApi.useLogoutMutation();
  const { signOut } = useFirebaseAuth();

  const action = useCallback(async () => {
    await logout();
    await signOut();
    dispatch(logoutAction());
  }, [dispatch, logout]);

  return action;
};

const clearData = (dispatch) => {
  dispatch(clearNotifications());
  dispatch(clearCart());
  dispatch(clearOrder());
}

const useLogout = () => {
  const logout = useLogoutAction();
  const navigate = useNavigate();
  const { signOut } = useFirebaseAuth();
  const handleLogout = useCallback(
    async (e) => {
      e?.preventDefault();
      confirmLogout(async () => {
        try {
          await logout();
          await signOut();
          clearData(dispatch);
          navigate('/login');
          toast.success('Logged out successfully');
        } catch (error) {
          if ([401, 403].includes(error?.status)) return toast.error('Logged out due to unauthorized access');
          toast.error(error?.data?.message || 'Logout failed');
          console.error('Error:', error);
        }
      });
    },
    [logout, navigate]
  );

  return handleLogout;
};
export default useLogout;
