import { messaging, requestFCMToken } from '@app/config';
import { addNotification } from '@app/slices';
import { onMessage } from 'firebase/messaging';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const useNotification = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await requestFCMToken();
        console.log('FCM Token:', token);
      } catch (error) {
        console.error('Error fetching FCM token:', error);
      }
    };

    fetchToken();

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