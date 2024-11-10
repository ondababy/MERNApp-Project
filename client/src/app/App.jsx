import router from '@app/routes';
import { Spinner } from '@common';
import { useNotification } from '@custom';
import 'animate.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  useNotification();
  const isLoading = useSelector(state => state.loading.isLoading);
  return (
    <React.StrictMode>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        stacked
      />
      <RouterProvider router={router} className={isLoading ? 'cursor-wait pointer-events-none' : ''} />
      {isLoading &&
        <div className="fixed top-0 left-0 z-[100] h-screen w-screen  cursor-wait">
          <Spinner />
        </div>
      }
    </React.StrictMode>
  );
}

export default App;
