import { toast } from 'react-toastify';

const errorWrapper = (fn, onError = () => {}) => {
  try {
    return fn();
  } catch (e) {
    const errors = e?.data?.errors?.details;
    if (Array.isArray(errors)) {
      errors.forEach((error) => {
        toast.error(error?.msg || 'Error while performing action');
      });
    } else toast.error(e?.data?.message || 'Error while performing action.');
    return onError(e);
  }
};

const requestError = (error) => {
  const errors = error?.data?.errors?.details;
  if (Array.isArray(errors)) {
    errors.forEach((error) => {
      toast.error(error?.msg || 'Error while performing action');
    });
  } else toast.error(error?.data?.message || 'Error while performing action.');
};

export { errorWrapper, requestError };

