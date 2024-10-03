import { UserSection } from '@partials';
import { useOutletContext } from 'react-router-dom';

function Dashboard() {
  const { userInfo } = useOutletContext();
  return userInfo?.id && <UserSection user={userInfo} />;
}

export default Dashboard;
