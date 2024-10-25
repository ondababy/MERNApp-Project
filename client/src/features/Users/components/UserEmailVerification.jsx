import { InputOTPForm } from '@custom/components';
import { useEffect } from 'react';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useEmailVerification } from '../hooks/useEmailVerification';

function EmailVerification({ onSave = () => { } }) {
  const { verify, resend, userInfo, otp, setOTP } = useEmailVerification();

  const handleOTPChange = (otp) => {
    setOTP(otp);
  }

  useEffect(() => {
    userInfo?.emailVerifiedAt && onSave(userInfo);
  }, [userInfo])



  return (
    <>
      <div className="w-full">
        {!userInfo?.emailVerifiedAt ? (<>
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
        </>) : (<>

          <div className="flex items-center gap-2">
            <span className="text-4xl text-success flex items-center justify-center">
              <IoIosCheckmarkCircle />
            </span>
            <h1 className="font-extrabold text-xl ">Email Verified</h1>
          </div>
          <p className="text-sm italic text-gray-600">
            Your email has been successfully verified.
          </p>
          {/* Reverify */}
          <button
            onClick={resend}
            className="my-4 btn btn-outline btn-secondary btn-ghost btn-primary">
            Reverify
          </button>
        </>)}
      </div>
    </>
  );
}

EmailVerification.propTypes = {};

export default EmailVerification;

