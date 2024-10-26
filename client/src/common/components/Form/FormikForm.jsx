import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import FormikInput from './FormikInput';
import ImageInput from './ImageInput';

function FormikForm({ formikProps, formSchema, element = () => { }, formClass, ...formProps }) {
  return (
    <Formik {...formikProps}>
      {(props) => (
        <Form
          autoComplete="off"
          className={'w-full flex flex-col gap-8 ' + formClass}
          {...formProps}
        >
          {formSchema.map((field, idx) => {
            if (field.type === 'image') {
              return (
                <ImageInput
                  key={(field.name ? field.name : Math.random(10000)) + idx}
                  {...field}
                  formik={props}
                />
              );
            }
            return (
              <FormikInput
                key={(field.name ? field.name : Math.random(10000)) + idx}
                {...field}
              />
            );
          })}

          {typeof element === 'function' ? element(props) : element}
        </Form>
      )}
    </Formik>
  );
}

FormikForm.propTypes = {
  formikProps: PropTypes.object,
  formSchema: PropTypes.array,
  element: PropTypes.func,
  formClass: PropTypes.string,
};

export default FormikForm;
