import { Button } from 'react-daisyui';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FormikForm } from '@common/components';
import { useFirebaseAuth } from '@custom';

import { authApi } from '../auth.api';
import { setCredentials } from '../auth.slice';
import { signupValidation } from '../auth.validation.js';

const signupSchema = [
  { label: 'Username', name: 'username', type: 'text' },
  { label: 'Email Address', name: 'email', type: 'email' },
  { label: 'Enter Password', name: 'password', type: 'password' },
  { label: 'Confirm Password', name: 'confirm_password', type: 'password' },
];
const signupFormik = {
  initialValues: signupSchema.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {}),
  validationSchema: signupValidation,
};
function SignupFrom() {
  const { token: fcmToken } = useSelector(state => state.notifications);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = authApi.useRegisterMutation();

  const {
    signInWithGoogle,
    signInWithFacebook,
  } = useFirebaseAuth();


  const handleSignup = async (values) => {
    try {
      const res = await register({ ...values, fcmToken }).unwrap();
      if (!res) return toast.error('Signup failed');
      dispatch(
        setCredentials({
          userInfo: {
            ...res.user,
            info: values?.info || null
          },
          token: res?.token,
          role: res?.user?.role,
        })
      );
      navigate('/dashboard');
      toast.success('Signup successfully');
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

    return handleSignup({
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
      formikProps={{ ...signupFormik, onSubmit: handleSignup }}
      formSchema={signupSchema}
      element={({ isSubmitting, ...rest }) => {
        return (
          <>
            <Button
              variant="outline"
              color="primary"
              type="submit"
              disabled={isSubmitting || isLoading}
            >
              Sign Up
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
              Alread have an account?
              <Link
                to="/login"
                className="link link-secondary"
              >
                Login
              </Link>
            </div>
          </>
        );
      }}
    />
  );
}

export default SignupFrom;
