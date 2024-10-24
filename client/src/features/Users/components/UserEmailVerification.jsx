import { InputOTPForm } from '@custom/components';
import React from 'react';

function EmailVerificaiton({ onSave = () => { } }) {
  const [otp, setOTP] = React.useState('');
  const handleOTPChange = (otp) => {
    setOTP(otp);
  }


  const handleVerify = () => {
    onSave(otp);
  }

  const handleResend = () => { }


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
          <InputOTPForm onChange={handleOTPChange} />
        </div>

        {/* Verify  */}
        <div className="flex gap-2 my-4">
          <button
            onClick={handleVerify}
            className="btn btn-sm btn-primary">Verify</button>
          <button
            onClick={handleResend}
            className="btn btn-sm btn-ghost btn-primary">Resend Code</button>
        </div>
      </div>
    </>
  );
}

EmailVerificaiton.propTypes = {};

export default EmailVerificaiton;

