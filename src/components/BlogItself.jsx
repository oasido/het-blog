import { useNavigate, useParams } from 'react-router';
import useFetch from './useFetch';
import ReactLoading from 'react-loading';
import NotFound from './NotFound';

const BlogItself = ({ user }) => {
  const { isAuthenticated, username } = user;

  const { id } = useParams();
  const { data: blog, isLoading, error } = useFetch('/api/blogs/' + id);
  const navigate = useNavigate();

  const handleDelete = () => {
    fetch('/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, username }),
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <div>
      {error && <NotFound />}
      {isLoading && (
        <div>
          <ReactLoading className="loading" color="#000" type="spin" />
          <div className="loading">Loading, please wait...</div>
        </div>
      )}
      <div className="blog-details">
        {blog && (
          <article>
            <h2>{blog.title}</h2>
            <p className="line-break">{blog.body}</p>
            <div className="blog-info">
              <p>Written by: {blog.author}</p>
              <p>Contact: {blog.email}</p>
            </div>
            {isAuthenticated && blog.author === username && (
              <button className="background-danger" onClick={handleDelete}>
                Remove
              </button>
            )}
          </article>
        )}
      </div>
    </div>
  );
};

export default BlogItself;
