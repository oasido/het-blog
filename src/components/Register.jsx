import { useState } from 'react';
import FlashMsg from './FlashMsg';

const Register = (props) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    setUser((previousValue) => {
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
  const handleRegisterSubmit = async (e) => {
    setErrorMessage(null);
    e.preventDefault();
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const body = await response.json();
    if (body.error) {
      setErrorMessage(body.error.message);
    }
  };

  return (
    <form onSubmit={handleRegisterSubmit}>
      <div className="form-container">
        <h2>Register</h2>

        <input name="username" className="form-field" type="text" placeholder="user" value={user.username} onChange={handleChange} />

        <input name="email" className="form-field" type="email" placeholder="email" value={user.email} onChange={handleChange} />

        <input name="password" className="form-field" type="password" placeholder="password" value={user.password} onChange={handleChange} />

        <input name="confirmPassword" className="form-field" type="password" placeholder="confirm password" value={user.confirmPassword} onChange={handleChange} />
        <button type="submit" className="form-field button">
          register
        </button>
        {errorMessage && <FlashMsg message={errorMessage} />}
      </div>
    </form>
  );
};

export default Register;
