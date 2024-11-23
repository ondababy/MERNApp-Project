import { useField } from 'formik';
import PropTypes from 'prop-types';
import BirthdateInput from './BirthdateInput';
import FloatingInput from './FloatingInput';
import FormDivider from './FormDivider';
import FormInput from './FormInput';
import LongText from './LongText';


function FormikInput({ label, variant, ...props }) {
  const [field, meta] = useField({ ...props, name: props.name ?? Math.random(1000) });
  switch (variant) {
    case 'divider':
      return (
        <FormDivider
          label={label}
          {...props}
        />
      )
    case 'textarea':
      return (
        <LongText
          label={label}
          meta={meta}
          {...field}
          {...props}
        />
      );
    case 'floating':
      return (
        <FloatingInput
          label={label}
          meta={meta}
          {...field}
          {...props}
        />
      );
    case 'birthdate':
      return (
        <BirthdateInput
          label={label}
          meta={meta}
          {...field}
          {...props}
        />
      )

    default:
      // return (
      //   <FloatingInput
      //     label={label}
      //     meta={meta}
      //     {...field}
      //     {...props}
      //   />
      // );
      return (
        <FormInput
          label={label}
          meta={meta}
          {...field}
          {...props}
        />
      );
  }
}

FormikInput.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.string,
};

export default FormikInput;
