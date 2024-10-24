import { useCheckAuth } from '@custom';
import { FooterWrapper, Header } from '@partials';
import { Navigate, Outlet } from 'react-router-dom';

export function DefaultLayout() {
  const { userInfo: user } = useCheckAuth();
  console.log(user)
  return !user?.id ? <Navigate to="/login" /> : (
    <div id="default-layout" >
      <Header />
      <div className="w-full grid min-h-screen  mx-auto place-items-center">
        <Outlet />
      </div>
      <FooterWrapper />
    </div>
  )
}
