import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import useFetch from './useFetch';
import ProfilePicture from './ProfilePicture';
import ReactLoading from 'react-loading';
import NotFound from './NotFound';
import { UserContext } from './UserContext';

const BlogItself = () => {
  const user = useContext(UserContext);
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
    <div className="post">
      {error && <NotFound />}
      {isLoading && (
        <div>
          <ReactLoading className="loading" color="#000" type="spin" />
          <div className="loading">Loading, please wait...</div>
        </div>
      )}
      <div className="post-details">
        {blog && (
          <article>
            <div className="top-bar">
              <a href={'/u/' + blog.author}>
                <ProfilePicture className="author-picture" src={`/profile-pictures/${blog.authorID}`} />
              </a>
              <div>
                <a href={'/u/' + blog.author}>
                  <p className="author-text">{blog.author}</p>
                  <p className="time-posted">{blog.date}</p>
                </a>
              </div>
              {isAuthenticated && blog.author === username && (
                <div className="remove-blog">
                  <button className="background-danger" onClick={handleDelete}>
                    🗑 Remove
                  </button>
                </div>
              )}
            </div>
            <h1>{blog.title}</h1>
            <h2 className="blog-description">{blog.description}</h2>
            <p className="line-break blog-body">{blog.body}</p>
          </article>
        )}
      </div>
    </div>
  );
};

export default BlogItself;
