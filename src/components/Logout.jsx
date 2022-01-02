import { useContext } from 'react';
import { UserContext } from './UserContext';

const Logout = () => {
  const user = useContext(UserContext);
  const { isAuthenticated } = user;
  if (isAuthenticated) {
    const postLogoutRequest = () => {
      fetch('/logout', {
        method: 'POST',
      }).then(
        setTimeout(() => {
          window.location.href = '/';
        }, 1000)
      );
    };
    postLogoutRequest();
  } else {
    window.location.href = '/';
  }

  return <div className="logout">Logging out...</div>;
};

export default Logout;
