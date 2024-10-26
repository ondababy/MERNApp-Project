import { toast } from 'react-toastify';

const errorWrapper = (fn, onError = () => {}) => {
  try {
    return fn();
  } catch (e) {
    toast.error(e.message || 'Something went wrong!');
    console.error(e);
    return onError(e);
  }
};

const requestError = (error) => {
  const { status = 400, data = {} } = error;
  const { name = 'Error', errors = {}, message = 'Something went wrong!' } = data;
  if (errors?.details?.length) {
    errors?.details?.forEach((error) => {
      toast.error(error?.msg || 'Error while performing action');
    });
  } else toast.error(message || 'Request Error: Something went wrong.');
};

export { errorWrapper, requestError };

