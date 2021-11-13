import { useState } from 'react';

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
          confirmPassword: previousValue.confirmPassword,
        };
      } else if (name === 'password') {
        return {
          username: previousValue.username,
          password: value,
          confirmPassword: previousValue.confirmPassword,
        };
      }
    });
  };

  const handleLogin = () => {
    console.log('handleLogin');
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="form-container">
        <h2>Login</h2>

        <input name="username" className="form-field" type="text" placeholder="user" value={user.username} onChange={handleChange} />

        <input name="password" className="form-field" type="password" placeholder="password" value={user.password} onChange={handleChange} />

        <button className="form-field button">login</button>
      </div>
    </form>
  );
};

export default Login;
