import { FooterWrapper, Header } from '@partials';
import { Outlet } from 'react-router-dom';

export function DefaultLayout() {
  return (
    <div id="guest-layout" >
      <Header />
      <div className="w-full grid min-h-screen  mx-auto place-items-center">
        <Outlet />
      </div>
      <FooterWrapper />
    </div>
  )
}
