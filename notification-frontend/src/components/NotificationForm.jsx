import { useState } from 'react';
import { createNotification } from '../api';

const NotificationForm = ({ userId, onNotificationCreated }) => {
  const [type, setType] = useState('email');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const notification = { userId, type, message };
      const result = await createNotification(notification);
      onNotificationCreated(result.notification);
      setMessage('');
    } catch (err) {
      setError('Failed to create notification');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="notification-form">
      <h3>Create New Notification</h3>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="in-app">In-App</option>
          </select>
        </div>
        <div className="form-group">
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Notification'}
        </button>
      </form>
    </div>
  );
};

export default NotificationForm;