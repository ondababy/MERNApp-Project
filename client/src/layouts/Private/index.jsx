import { toggleSideBar } from '@app/slices/theme.slice';
import { useToggle } from '@common';
import { useCheckAuth } from '@custom';
import { DashboardHeader, FooterWrapper, Sidebar } from '@partials';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


export function PrivateLayout() {
  const dispatch = useDispatch();
  const { sideBarToggle } = useSelector(state => state.theme);
  const [visible, toggleVisible] = useToggle(true);
  const { isAdmin, userInfo } = useCheckAuth(true) || {
    name: 'Private User',
  };

  useEffect(() => {
    // console.log(visible, sideBarToggle);
  }, [visible]);

  return (
    !isAdmin ? <Navigate to="/login" /> : (
      <div
        id="private-layout"
        className="flex w-screen h-screen overflow-y-auto "
      >
        <Sidebar
          visible={visible}
          noOverlay={visible}
          toggleVisible={toggleVisible}
        >
          <DashboardHeader
            toggleVisible={toggleVisible}
            visible={!visible}
          />
          <div className="relative w-full">
            <div className="w-full grid min-h-screen mx-auto place-items-center">
              <Suspense fallback={<div>Loading...</div>}>
                <Outlet context={{ userInfo }} />
              </Suspense>
            </div>
            <FooterWrapper />
          </div>
        </Sidebar>
      </div>
    )
  );
}

