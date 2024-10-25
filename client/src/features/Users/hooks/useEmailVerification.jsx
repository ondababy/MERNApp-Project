import { confirmSave } from '@custom';
import { setCredentials } from '@features';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { userApi } from '../user.api';

export function useEmailVerification() {

  /* DECLARATIONS #################################################### */
  const RESEND_DELAY = 30;
  const dispatch = useDispatch();
  const [otp, setOTP] = useState('');
  const { userInfo, accessToken } = useSelector((state) => state.auth);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [sendVerifyEmail] = userApi.useSendVerifyEmailMutation();
  const [verifyEmail] = userApi.useVerifyEmailMutation();
  const [resendDelay, setResendDelay] = useState(0);
  /* DECLARATIONS #################################################### */

  const verify = useCallback(async () => {
    const verifyToken = new URLSearchParams(window.location.search).get('verifyToken');
    const payload = { id: userInfo.id, otp, verifyToken };
    verifyEmail(payload).then((res) => {
      dispatch(setCredentials({
        userInfo: res?.data?.user,
        token: res?.data?.token,
        role: res?.data?.user?.role
      }));
      toast.success('Email verified successfully');
    });
  }, [otp, userInfo.id, verifyEmail, dispatch]);

  const resend = useCallback(async () => {
    const redirectUrl = `${window.location.origin}/onboarding`;
    sendVerifyEmail({
      id: userInfo.id, redirectUrl
    }).then((res) => {
      setIsCodeSent(true);
      dispatch(setCredentials({
        userInfo: { ...userInfo, emailVerifiedAt: null },
        token: accessToken,
        role: userInfo?.role
      }));
      toast.success('Email sent successfully');
      setResendDelay(RESEND_DELAY);
    });
  }, [userInfo, accessToken, sendVerifyEmail, dispatch]);

  useEffect(() => {
    const otpFromUrl = new URLSearchParams(window.location.search).get('otp');
    if (otpFromUrl) setOTP(otpFromUrl);
  }, []);

  useEffect(() => {
    if (resendDelay > 0) {
      const timer = setTimeout(() => setResendDelay(resendDelay - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendDelay]);

  return {
    isCodeSent,
    verify,
    resend,
    userInfo,
    otp,
    setOTP,
    resendDelay
  };
}
