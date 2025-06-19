import { useState } from 'react';
import NotificationForm from './components/NotificationForm';
import NotificationList from './components/NotificationList';
import './styles.css';

const App = () => {
  const [userId, setUserId] = useState('user1@example.com');
  const [refreshList, setRefreshList] = useState(false);

  const handleNotificationCreated = () => {
    setRefreshList(!refreshList);
  };

  return (
    <div className="app">
      <header>
        <h1>Notification Service</h1>
      </header>
      <main>
        <div className="user-control">
          <label>
            User ID : <nbsp></nbsp>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </label>
        </div>
        <div className="content">
          <div className="form-section">
            <NotificationForm
              userId={userId}
              onNotificationCreated={handleNotificationCreated}
            />
          </div>
          <div className="list-section">
            <NotificationList userId={userId} key={refreshList} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;