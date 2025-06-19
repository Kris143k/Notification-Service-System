const StatusIndicator = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'sent':
        return 'green';
      case 'failed':
        return 'red';
      case 'pending':
        return 'orange';
      default:
        return 'gray';
    }
  };

  return (
    <span className="status-indicator" style={{ color: getStatusColor() }}>
      {status}
    </span>
  );
};

export default StatusIndicator;