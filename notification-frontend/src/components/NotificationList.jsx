import { useEffect, useState } from 'react';
import { getUserNotifications } from '../api';
import StatusIndicator from './StatusIndicator';

const NotificationList = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getUserNotifications(userId);
        setNotifications(data);
      } catch (err) {
        setError('Failed to load notifications');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  if (loading) return <div>Loading notifications...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="notification-list">
      <h3>Notifications for User: {userId}</h3>
      {notifications.length === 0 ? (
        <p>No notifications found</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id} className="notification-item">
              <div className="notification-header">
                <span className="notification-type">{notification.type}</span>
                <StatusIndicator status={notification.status} />
                <span className="notification-time">
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="notification-message">{notification.message}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationList;