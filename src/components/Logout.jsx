const Logout = ({ user }) => {
  const { isAuthenticated } = user;
  if (isAuthenticated) {
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
