
import { confirmSave } from '@custom';
import { setCredentials } from '@features';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userApi } from '../user.api';

export function useEmailVerification() {

  /* DECLARATIONS #################################################### */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOTP] = useState('');
  const { userInfo } = useSelector((state) => state.auth);
  const [sendVerifyEmail] = userApi.useSendVerifyEmailMutation()
  const [verifyEmail] = userApi.useVerifyEmailMutation()
  /* DECLARATIONS #################################################### */

  const verify = useCallback(async () => {
    const verifyToken = new URLSearchParams(window.location.search).get('verifyToken');
    const payload = { id: userInfo.id, otp, verifyToken };
    verifyEmail(payload).then((res) => {
      toast.success('Email verified successfully');
      dispatch(setCredentials({
        userInfo: res?.data?.user,
      }));
      navigate('/dashboard');
    });
  })
  const resend = useCallback(async () => {
    const redirectUrl = `${window.location.origin}/onboarding`
    sendVerifyEmail({
      id: userInfo.id, redirectUrl
    }).then((res) => {
      toast.success('Email sent successfully');
    });
  })

  useEffect(() => {
    const otpFromUrl = new URLSearchParams(window.location.search).get('otp');
    if (otpFromUrl) setOTP(otpFromUrl);
  }, [])

  return {
    verify,
    resend,
    userInfo,
    otp,
    setOTP
  }
}
