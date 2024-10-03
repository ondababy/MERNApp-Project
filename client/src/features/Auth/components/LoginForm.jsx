import { FormikForm } from '@common/components';
import { Button } from 'react-daisyui';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
  const [login, { isLoading }] = authApi.useLoginMutation();

  const handleLogin = async (values) => {
    try {
      const res = await login(values).unwrap();
      dispatch(
        setCredentials({
          userInfo: res.user,
          token: res.token,
        })
      );
      navigate('/dashboard');
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
          <Button
            variant="outline"
            color="primary"
            disabled={isSubmitting || isLoading}
            type="submit"
          >
            Log In
          </Button>
        );
      }}
    />
  );
}
export default LoginForm;
