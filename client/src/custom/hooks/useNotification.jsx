import { messaging, requestFCMToken } from '@app/config';
import { addNotification, setToken } from '@app/slices';
import { onMessage } from 'firebase/messaging';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useNotification = () => {
  const dispatch = useDispatch();
  const { fcmToken } = useSelector((state) => state.notifications);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await requestFCMToken();
        dispatch(setToken(token));
      } catch (error) {
        console.error('Error fetching FCM token:', error);
      }
    };

    if (!fcmToken) {
      fetchToken();
    }

  }, [fcmToken]);

  useEffect(() => {
    if (!messaging) return;
    const unsubscribe = onMessage(messaging, (payload) => {
      try {
        console.log('Message received. ', payload);
        const { title = '', body = '', type = 'info' } = payload.notification;
        toast[type](body, { title });
        dispatch(addNotification({
          title,
          message: body,
          type: 'info',
          timestamp: new Date().toISOString(),
        }));
      } catch (error) {
        console.error('Error displaying notification:', error)
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export default useNotification;