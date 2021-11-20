import { useState } from 'react';
import FlashMsg from './FlashMsg';

const Login = (props) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    setUser((previousValue) => {
      if (name === 'username') {
        return {
          username: value,
          password: previousValue.password,
        };
      } else if (name === 'password') {
        return {
          username: previousValue.username,
          password: value,
        };
      }
    });
  };

  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (e) => {
    setErrorMessage(null);
    e.preventDefault();
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if ((await response.status) === 200) {
      window.location.href = '/';
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="form-container">
        <h2>Login</h2>

        <input name="username" className="form-field" type="text" placeholder="user" value={user.username} onChange={handleChange} />

        <input name="password" className="form-field" type="password" placeholder="password" value={user.password} onChange={handleChange} />

        <button className="form-field button">login</button>
        <FlashMsg message={errorMessage} />
      </div>
    </form>
  );
};

export default Login;
