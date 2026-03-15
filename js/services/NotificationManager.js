const NotificationManager = () => {
  const [notifications, setNotifications] = React.useState([]);

  React.useEffect(() => {
    // Request permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const showNotification = (options) => {
    const { title, body, icon, ...rest } = options;

    // Browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: icon || '/favicon.ico' });
    }

    // In-app notification
    const notification = {
      id: Date.now(),
      title,
      body,
      icon,
      timestamp: Date.now(),
      read: false,
      ...rest
    };

    setNotifications(prev => [notification, ...prev].slice(0, 50));

    return notification.id;
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return {
    notifications,
    showNotification,
    markAsRead,
    markAllAsRead,
    clearNotification
  };
};

window.NotificationManager = NotificationManager;
