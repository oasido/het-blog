const Input = ({ className, fieldName, type, isTextArea }) => {
  if (className === undefined) {
    className = '';
  }

  if (isTextArea === undefined) {
    isTextArea = false;
  }

  if (type === undefined) {
    type = 'text';
  }

  return (
    <>
      {!isTextArea && (
        <div className="field">
          <label>{fieldName}</label>
          <input className={'settings-input' + className} type={type} />
        </div>
      )}
      {isTextArea && (
        <div className="field">
          <label>{fieldName}</label>
          <textarea rows="3" className={'settings-input' + className}></textarea>
        </div>
      )}
    </>
  );
};

export default Input;
