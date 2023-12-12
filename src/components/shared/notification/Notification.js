import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './notification.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { notificationSlice } from '../../../store/slices/notification';
import { notifications  as notificationsConst } from '../../../const/notifications'

export default function Notification() {
  const notifications = useSelector(state => state.notification);
  const dispatch = useDispatch();
  const { remove } = notificationSlice.actions;

  React.useEffect(() => {
    if (notifications.length > 0) {
      const idToRemove = notifications[0].id;

      const timeoutId = setTimeout(() => {
        dispatch(remove(idToRemove));
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [dispatch, notifications, remove]);

  return (
    <AnimatePresence>
      {notifications.map((notification, i) => (
        <motion.div
          initial={{ y: -200 }}
          exit={{ y: -200 }}
          animate={{ y: 60 * (notifications.length - i - 1) }}
          key={notification.id}
          className={`${styles.container} ${styles[notification.type]}`}
          styles={{
            color: notificationsConst.colors[notification.type].primary,
            borderColor: notificationsConst.colors[notification.type].secondary
          }}
        >
          {notification.text}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
