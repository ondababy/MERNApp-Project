import App from '@app/App';
import store from '@app/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
const GOOGLE_API = import.meta.env.VITE_APP_GOOGLE_API;
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={GOOGLE_API}>
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
