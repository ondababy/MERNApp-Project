import { FormikForm } from '@common/components';
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { Button } from 'react-daisyui';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authApi } from '../auth.api';
import { setCredentials } from '../auth.slice';
import { loginValidation } from '../auth.validation.js';


const googleEndpoint = 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=';

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
  const [login, { isLoading }] = authApi.useLoginMutation();
  const [googleToken, setGoogleToken] = useState(null);

  const googleLogin = useGoogleLogin({
    onSuccess: tokenResponse => {
      setGoogleToken(tokenResponse.access_token);
      fetch(googleEndpoint + tokenResponse.access_token)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // handleLogin({
          //   email: data.email,
          //   password: data.id,
          //   googleLogin: true,
          // });
        });
    },

  });

  const handleLogin = async (values) => {
    try {
      const res = await login(values).unwrap();
      dispatch(
        setCredentials({
          userInfo: res.user,
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

              <Button onClick={() => googleLogin()} type='button'>
                <FaGoogle />
              </Button>
              <Button onClick={() => googleLogin()}>
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
