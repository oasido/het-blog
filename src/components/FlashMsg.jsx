const FlashMsg = ({ message, color }) => {
  return (
    <div className="flash-message" style={{ color: color, whiteSpace: 'pre-line', fontWeight: 'bold' }}>
      {message}
    </div>
  );
};

export default FlashMsg;
