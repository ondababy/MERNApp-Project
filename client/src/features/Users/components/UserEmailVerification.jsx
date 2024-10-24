import { InputOTPForm } from '@custom/components';
import React from 'react';
import { useEmailVerification } from '../hooks/useEmailVerification';

function EmailVerificaiton({ onSave = () => { } }) {
  const { verify, resend, userInfo, otp, setOTP } = useEmailVerification();
  const handleOTPChange = (otp) => {
    setOTP(otp);
  }



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
          <InputOTPForm otp={otp} onChange={handleOTPChange} />
        </div>

        {/* Verify  */}
        <div className="flex gap-2 my-4">
          <button
            onClick={verify}
            className="btn btn-sm btn-primary">Verify</button>
          <button
            onClick={resend}
            className="btn btn-sm btn-ghost btn-primary">Resend Code</button>
        </div>
      </div>
    </>
  );
}

EmailVerificaiton.propTypes = {};

export default EmailVerificaiton;

