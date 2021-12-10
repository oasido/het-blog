import { Link } from 'react-router-dom';

const NotFound = ({ user }) => {
  return (
    <div className="not-found">
      {user && (
        <h2>
          Unable to find user <span style={{ color: 'red' }}>{user}</span>
        </h2>
      )}
      {!user && <h2>Page Not Found</h2>}
      <p>Sorry, but we looked far and wide and couldn't find it!</p>
      <br />
      <Link to="/">Go back</Link>
    </div>
  );
};

export default NotFound;
