import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = ({ user }) => {
  const { isAuthenticated } = user;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    window.location.href = '/';
  }

  const handleAddBlog = (e) => {
    e.preventDefault();
    setIsAddingBlog(true);
    const blog = { title, body, author, email };
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
        <h2>Add a New Blog</h2>

        <label>Blog Title</label>
        <input required value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Blog Body</label>
        <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>

        <label>Blog Author</label>
        <select required value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option disabled defaultValue value="">
            Please select
          </option>
          <option value="Ofek">Ofek</option>
          <option value="Dor">Dor</option>
        </select>

        {!isAddingBlog && <button type="submit">Add Blog</button>}
        {isAddingBlog && <button type="submit">Adding Blog..</button>}
      </form>
    </div>
  );
};

export default Create;
