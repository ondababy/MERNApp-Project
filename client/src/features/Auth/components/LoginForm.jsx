import { Button } from 'react-daisyui';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FormikForm } from '@common';
import { useFirebaseAuth } from '@custom';

import { authApi } from '../auth.api';
import { setCredentials } from '../auth.slice';
import { loginValidation } from '../auth.validation.js';

const loginSchema = [
  { label: 'Email Address', name: 'email', type: 'email' },
  { label: 'Enter Password', name: 'password', type: 'password' },
];
const loginFormik = {
  initialValues: {
    email: '',
    password: '',
  },
  validationSchema: loginValidation,
};

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token: fcmToken } = useSelector(state => state.notifications);
  const [login, { isLoading }] = authApi.useLoginMutation();

  const {
    signInWithGoogle,
    signInWithFacebook,
  } = useFirebaseAuth();

  const handleLogin = async (values) => {
    try {
      const res = await login({ ...values, fcmToken }).unwrap();
      dispatch(
        setCredentials({
          userInfo: {
            ...res.user,
            info: values?.info || null,
          },
          token: res.token,
          role: res.user.role,
        })
      );
      navigate('/');
      toast.success('Logged in successfully');
    } catch (e) {
      toast.error(e?.data?.message || e.error);
    }
  };

  const handleUserInfo = async (user) => {
    let { email, displayName, username = null } = user;
    let names = displayName.split(' ');
    if (!username) {
      username = names.join('').toLowerCase();
      username += Date.now();
    }
    const tempPassword = user?.uid?.slice(0, 20) || (Math.random().toString(36).slice(-8) + Date.now()).slice(0, 16);

    return handleLogin({
      email,
      username,
      password: tempPassword,
      confirm_password: tempPassword,
      info: {
        first_name: names[0] || '',
        last_name: names[names.length - 1] || '',
        contact: user?.phoneNumber || null,
        photoUrl: user?.photoURL || null,
      }
    });
  }

  const handleGoogleAuth = async () => {
    signInWithGoogle().then((res) => {
      if (res) {
        handleUserInfo(res.user);
      }
    });
  }

  const handleFacebookAuth = async () => {
    signInWithFacebook().then((res) => {
      if (res.user) {
        handleUserInfo(res.user);
      }
    });
  }


  return (
    <FormikForm
      formikProps={{ ...loginFormik, onSubmit: handleLogin }}
      formSchema={loginSchema}
      element={({ isSubmitting }) => {
        return (
          <>
            <Button
              variant="outline"
              color="primary"
              disabled={isSubmitting || isLoading}
              type="submit"
            >
              Log In
            </Button>

            <div className="divider my-0">or</div>
            <div className="social-media login flex gap-2 justify-center">

              <Button onClick={handleGoogleAuth} type='button'>
                <FaGoogle />
              </Button>
              <Button onClick={handleFacebookAuth} type='button'>
                <FaFacebook />
              </Button>
            </div>
            <div className="flex justify-center gap-2">
              Doesn&apos;t have an account?
              <Link
                to="/signup"
                className="link link-secondary"
              >
                Sign Up
              </Link>
            </div>
          </>
        );
      }}
    />
  );
}
export default LoginForm;
