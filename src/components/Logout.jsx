const Logout = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    const postLogoutRequest = async () => {
      await fetch('/logout', {
        method: 'POST',
      });
    };
    postLogoutRequest().then((window.location.href = '/'));
  }

  return <div className="logout">Logging out...</div>;
};

export default Logout;
