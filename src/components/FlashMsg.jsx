const FlashMsg = ({ message, color }) => {
  return (
    <p className="flash-message" style={{ color: color, whiteSpace: 'pre-line', fontWeight: 'bold' }}>
      {message}
    </p>
  );
};

export default FlashMsg;
