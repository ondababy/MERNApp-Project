import { useGetAuth, useLogout } from '@custom';
import { Button } from 'react-daisyui';
import { FaArrowRightFromBracket } from 'react-icons/fa6';

export default function AuthLogout(buttonProps) {
  const handleLogout = useLogout();
  const { userInfo } = useGetAuth();
  return (
    userInfo && (
      <form onSubmit={handleLogout}>
        <Button
          type="submit"
          color="primary"
          variant="outline"
          {...buttonProps}
        >
          <FaArrowRightFromBracket />
          Log Out
        </Button>
      </form>
    )
  );
}
