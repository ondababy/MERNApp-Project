import { InputOTPForm } from '@custom/components';
import React from 'react';

function EmailVerificaiton(props) {
  return (
    <>
      <div className="w-full">
        <h1 className="font-extrabold text-xl  mb-4">Verify Your Email</h1>
        <p className="text-sm italic text-gray-600">
          We have sent an OTP to your email address. Please verify your email
        </p>
        <div className="divider"></div>
        <div className="form-wrapper">
          <span className="mb-2">Enter a 6-digit valid code.</span>
          <InputOTPForm />
        </div>

        {/* Verify  */}
        <div className="flex gap-2 my-4">
          <button className="btn btn-sm btn-primary">Verify</button>
          <button className="btn btn-sm btn-ghost btn-primary">Resend Code</button>
        </div>
      </div>
    </>
  );
}

EmailVerificaiton.propTypes = {};

export default EmailVerificaiton;

