import { useGetAuth, useLogout } from '@custom';
import { FaArrowRightFromBracket } from 'react-icons/fa6';

export default function AuthLogout({ iconOnly = false, ...buttonProps }) {
  const handleLogout = useLogout();
  const { userInfo } = useGetAuth();
  return (
    userInfo && (
      <div>
        <form onSubmit={handleLogout}>
          <button
            type="submit"
            className="btn btn-outline btn-primary rounded-btn "
            {...buttonProps}
          >
            <FaArrowRightFromBracket />
            {iconOnly ? '' : 'Logout'}
          </button>
        </form>
      </div>
    )
  );
}
