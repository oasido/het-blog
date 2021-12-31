import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FlashMsg from './FlashMsg';

const Register = (props) => {
  const navigate = useNavigate();
  const [userFields, setUserFields] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    setUserFields((previousValue) => {
      if (name === 'username') {
        return {
          username: value,
          email: previousValue.email,
          password: previousValue.password,
          confirmPassword: previousValue.confirmPassword,
        };
      } else if (name === 'email') {
        return {
          username: previousValue.username,
          email: value,
          password: previousValue.password,
          confirmPassword: previousValue.confirmPassword,
        };
      } else if (name === 'password') {
        return {
          username: previousValue.username,
          email: previousValue.email,
          password: value,
          confirmPassword: previousValue.confirmPassword,
        };
      } else if (name === 'confirmPassword') {
        return {
          username: previousValue.username,
          email: previousValue.email,
          password: previousValue.password,
          confirmPassword: value,
        };
      }
    });
  };

  // Error handling
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const handleRegisterSubmit = async (e) => {
    setErrorMessage(null);
    e.preventDefault();
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userFields),
    });
    const body = await response.json();
    if (body.error) {
      setSuccessMessage(null);
      setErrorMessage(body.error.message);
    }
    if (!body.error) {
      setErrorMessage(null);
      setSuccessMessage(`Sucessfully registered!
      Redirecting you to login page...`);
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <form onSubmit={handleRegisterSubmit}>
      <div className="form-container">
        {userFields.username ? <h2>Hello there, {userFields.username}</h2> : <h2>Hello there</h2>}

        <input name="username" className="form-field" type="text" placeholder="user" value={userFields.username} onChange={handleChange} />

        {/* <input name="email" className="form-field" type="email" placeholder="email" value={userFields.email} onChange={handleChange} /> */}

        <input name="password" className="form-field" type="password" placeholder="password" value={userFields.password} onChange={handleChange} />

        <input name="confirmPassword" className="form-field" type="password" placeholder="confirm password" value={userFields.confirmPassword} onChange={handleChange} />
        <button type="submit" className="form-field button">
          register
        </button>
        {errorMessage && <FlashMsg color="red" message={errorMessage} />}
        {successMessage && <FlashMsg color="green" message={successMessage} />}
      </div>
    </form>
  );
};

export default Register;
