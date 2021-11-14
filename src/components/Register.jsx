import { useState } from 'react';

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

  return (
    <div className="form-container">
      <h2>Register</h2>

      <input name="username" className="form-field" type="text" placeholder="user" value={user.username} onChange={handleChange} />

      <input name="password" className="form-field" type="password" placeholder="password" value={user.password} onChange={handleChange} />

      <input name="confirmPassword" className="form-field" type="password" placeholder="confirm password" value={user.confirmPassword} onChange={handleChange} />

      <button className="form-field button">register</button>
    </div>
  );
};

export default Register;
