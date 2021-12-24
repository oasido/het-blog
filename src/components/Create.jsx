import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const Create = () => {
  const user = useContext(UserContext);
  const { isAuthenticated, email, username: author, userID: authorID } = user;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/');
  }

  const handleAddBlog = (e) => {
    e.preventDefault();
    setIsAddingBlog(true);
    const blog = { title, description, body, author, authorID, email };
    fetch('/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    }).then(() => {
      setIsAddingBlog(false);
      navigate('/');
    });
  };

  return (
    <div className="create">
      <form onSubmit={handleAddBlog}>
        <input className="create-title" required maxLength="70" placeholder="Post title goes here..." value={title} onChange={(e) => setTitle(e.target.value)} />
        <input
          className="create-description"
          required
          maxLength="50"
          placeholder="Short description, hashtags..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <textarea className="create-body" required placeholder="Write your post here..." rows="20" value={body} onChange={(e) => setBody(e.target.value)}></textarea>

        {!isAddingBlog && (
          <button className="create-post" type="submit">
            Publish
          </button>
        )}
        {isAddingBlog && (
          <button className="create-post" type="submit">
            Posting...
          </button>
        )}
      </form>
    </div>
  );
};

export default Create;
