import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';

import { FormikForm } from '@common/components';
import { confirmSave, requestError, toFormData } from '@custom';
import { useEffect, useMemo, useState } from 'react';
import { Button } from 'react-daisyui';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AccountInformation(props) {
  const accSchema = [];
  const accFormik = {
    initialValues: accSchema.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {}),
  };


  return (
    <div className="w-full min-h-full">
      <h1 className="font-extrabold text-xl  mb-4">Account Information</h1>
      <div className="divider"></div>
      <div className="form-wrapper ">
        <FormikForm
          formikProps={{ ...accFormik, onSubmit: () => { } }}
          formSchema={accSchema}
          element={({ isSubmitting, ...rest }) => {
            return (
              <></>
            );
          }}
        />
      </div>
    </div>
  );
}


