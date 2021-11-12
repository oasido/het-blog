import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Page Not Found</h2>
      <p>Sorry, but that page doesn't exist!</p>
      <br />
      <Link to="/">Go back</Link>
    </div>
  );
};

export default NotFound;
