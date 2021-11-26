import { useNavigate, useParams } from 'react-router';
import useFetch from './useFetch';
import ReactLoading from 'react-loading';
import NotFound from './NotFound';

const BlogItself = ({ user }) => {
  const { isAuthenticated, username, email } = user;

  const { id } = useParams();
  const { data: blog, isLoading, error } = useFetch('http://localhost:3080/api/blogs/' + id);
  const navigate = useNavigate();

  const handleDelete = () => {
    fetch('http://localhost:8000/blogs/' + id, {
      method: 'DELETE',
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
              <p>Written by: {username}</p>
              <p>Contact: {email}</p>
            </div>
            {isAuthenticated && <button onClick={handleDelete}>Delete Blog</button>}
          </article>
        )}
      </div>
    </div>
  );
};

export default BlogItself;
