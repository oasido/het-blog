import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = ({ user }) => {
  const { isAuthenticated, email, username: author, userID: authorID } = user;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    window.location.href = '/';
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
        <h2>Create A New Post</h2>

        <label>Title</label>
        <input required value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Body</label>
        <textarea required rows="10" value={body} onChange={(e) => setBody(e.target.value)}></textarea>

        {!isAddingBlog && <button type="submit">Post</button>}
        {isAddingBlog && <button type="submit">Posting...</button>}
      </form>
    </div>
  );
};

export default Create;
