const API_BASE_URL = '/api';

export const createNotification = async (notificationData) => {
  const response = await fetch(`${API_BASE_URL}/notifications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notificationData),
  });
  return await response.json();
};

export const getUserNotifications = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/notifications`);
  return await response.json();
};