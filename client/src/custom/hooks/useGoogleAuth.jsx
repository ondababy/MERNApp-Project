
import { useGoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from 'react';


// Callback
// handleLogin({
//   email: data.email,
//   password: data.id,
//   googleLogin: true,
//   info: {
//     first_name: data.given_name,
//     last_name: data.family_name,
//     avatar: data.picture,
//     google_id: data.id,
//     verified_email: data.verified_email,
//   }
// });

const googleEndpoint = 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=';

export default function useGoogleAuth() {
  const [googleToken, setGoogleToken] = useState(null);
  const [googleData, setGoogleData] = useState(null);

  const googleLogin = useGoogleLogin({
    onSuccess: tokenResponse => {
      setGoogleToken(tokenResponse.access_token);
      fetch(googleEndpoint + tokenResponse.access_token)
        .then(response => response.json())
        .then(data => {
          setGoogleData(data);
        });
    },
  });
  useEffect(() => {
    console.log(googleData);
  }, [googleData]);
  

  return {
    googleLogin,
    googleToken,
    googleData,
  }
}
