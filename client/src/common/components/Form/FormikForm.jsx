import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import FormikInput from './FormikInput';
import ImageInput from './ImageInput';

function FormikForm({ formikProps, formSchema, element = () => {}, formClass, ...formProps }) {
  return (
    <Formik {...formikProps}>
      {(props) => (
        <Form
          autoComplete="off"
          className={'flex flex-col gap-8 ' + formClass}
          {...formProps}
        >
          {formSchema.map((field, idx) => {
            if (field.type === 'image') {
              return (
                <ImageInput
                  key={field.name + idx}
                  {...field}
                  formik={props}
                />
              );
            }
            return (
              <FormikInput
                key={field.name + idx}
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
