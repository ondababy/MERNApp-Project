import { FormikForm, FormikInput } from '@common/components';
import React from 'react';
import { Button } from 'react-daisyui';

export default function AccountInformation(props) {
  const accSchema = [];
  const accFormik = {
    initialValues: accSchema.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {}),
  };


  return (
    <div className="w-full h-full">
      <h1 className="font-extrabold text-xl  mb-4">Account Information</h1>
      <div className="divider"></div>
      <div className="form-wrapper">
        <FormikForm
          formikProps={{ ...accFormik, onSubmit: () => { } }}
          formSchema={accSchema}
          element={({ isSubmitting, ...rest }) => {
            return (
              <>
                <div className="top flex flex-col lg:flex-row items-top gap-2 lg:gap-8">
                  <div className="right lg:w-2/6 shadow-2xl p-4 py-8">
                    <div className="image-preview flex flex-col items-center gap-2 lg:gap-4">
                      <img
                        src="https://placehold.co/150"
                        alt="profile"
                        className="rounded-full w-2/3 aspect-square"
                      />
                      <div className="image-preview__edit">
                        <label
                          htmlFor="image"
                          className="btn btn-outline btn-xs"
                        >
                          Select Profile
                        </label>
                        <input
                          type="file"
                          id="image"
                          hidden
                        />
                      </div>
                    </div>
                  </div>
                  <div className="left flex-1 flex flex-col gap-2">
                    {/* Full Name */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormikInput
                        label="First Name"
                        name="first_name"
                        type="text"

                      />
                      <FormikInput
                        label="Last Name"
                        name="last_name"
                        type="text"

                      />
                    </div>

                    {/* Email */}
                    <FormikInput
                      label="Email"
                      name="email"
                      type="email"

                    />

                    {/* Contact */}
                    <FormikInput
                      label="Contact"
                      name="contact"
                      type="text"

                    />
                    {/* Birthday + Age (disabled) */}
                    <div className="flex gap-2 items-center">
                      <div className="w-full">
                        <FormikInput
                          label="Birthday"
                          name="birthday"
                          type="date"

                        />
                      </div>
                      <div className="w-1/3">
                        <FormikInput
                          label="Age"
                          name="age"
                          type="text"
                          disabled

                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bottom flex flex-col gap-4">
                  {/* Address */}
                  <FormikInput
                    label="Address"
                    name="address"
                    type="text"

                  />

                  {/* Street */}
                  <FormikInput
                    label="Street"
                    name="street"
                    type="text"

                  />

                  {/* City + province + zipcode */}
                  <div className="grid grid-cols-3 gap-4">
                    <FormikInput
                      label="City"
                      name="city"
                      type="text"

                    />
                    <FormikInput
                      label="Province"
                      name="province"
                      type="text"

                    />
                    <FormikInput
                      label="Zipcode"
                      name="zipcode"
                      type="text"

                    />
                  </div>
                </div>

                <Button
                  variant="outline"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
              </>
            );
          }}
        />
      </div>
    </div>
  );
}


