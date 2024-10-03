import { FormikForm } from '@common/components';
import { Button } from 'react-daisyui';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = authApi.useRegisterMutation();

  const handleSignup = async (values) => {
    try {
      const res = await register(values).unwrap();
      dispatch(
        setCredentials({
          userInfo: res.user,
          token: res.token,
        })
      );
      navigate('/dashboard');
      toast.success('Signup successfully');
    } catch (e) {
      toast.error(e?.data?.message || e.error);
    }
  };
  return (
    <FormikForm
      formikProps={{ ...signupFormik, onSubmit: handleSignup }}
      formSchema={signupSchema}
      element={({ isSubmitting, ...rest }) => {
        return (
          <Button
            variant="outline"
            color="primary"
            type="submit"
            disabled={isSubmitting || isLoading}
          >
            Sign Up
          </Button>
        );
      }}
    />
  );
}

export default SignupFrom;
