import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { globalDataSelectors, globalDataActions } from '../../redux';

import { NotificationEl } from './Notification.css';

const notificationRoot = document.querySelector('#notification-root');

function Notification() {
  const [isNotificationShow, setisNotificationShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setisNotificationShow(true);
    setTimeout(() => {
      dispatch(globalDataActions.deleteErrorText());
      setisNotificationShow(false);
    }, 5000);
  }, [dispatch]);

  const errorText = useSelector(globalDataSelectors.getErrorText);

  return createPortal(
    <NotificationEl>{isNotificationShow && errorText}</NotificationEl>,
    notificationRoot
  )
}

export default Notification;