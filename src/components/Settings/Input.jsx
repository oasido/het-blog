import { useState } from 'react';

const Input = ({ className, fieldName, name, type, isTextArea, onChange, required }) => {
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
          <input required={required} onChange={onChange} name={name} className={'settings-input' + className} type={type} />
        </div>
      )}
      {isTextArea && (
        <div className="field">
          <label>{fieldName}</label>
          <textarea required={required} onChange={onChange} name={name} rows="3" className={'settings-input' + className}></textarea>
        </div>
      )}
    </>
  );
};

export default Input;
