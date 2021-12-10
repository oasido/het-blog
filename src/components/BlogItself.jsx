import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import useFetch from './useFetch';
import ReactLoading from 'react-loading';
import NotFound from './NotFound';

const BlogItself = ({ user }) => {
  const { isAuthenticated, username } = user;
  const { id } = useParams();
  const { data: blog, isLoading, error } = useFetch('/api/blogs/' + id);
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState('');

  const getProfilePicture = async () => {
    const authorID = blog.authorID;
    const response = await fetch('/profile-picture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userID: authorID }),
    });
    const body = await response.json();
    setProfilePicture(body.profilePicture);
  };

  blog && getProfilePicture();
  // eslint-disable-next-line

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
              <img className="author-picture" src={profilePicture} alt="avatar" />
              <div>
                <p className="author-text">{blog.author}</p>
                <p className="time-posted">{blog.date}</p>
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
