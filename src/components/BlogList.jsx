import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sort from './Sort';
import ProfilePicture from './ProfilePicture';

function BlogList({ blogs }) {
  const reversedBlogs = [...blogs].reverse(); // New blogs show on top
  const [blogsOrder, setBlogsOrder] = useState({
    title: 'New',
    blogs: reversedBlogs,
  });

  const handleSort = (e) => {
    switch (true) {
      case e.target.innerText === 'Old' && blogsOrder.title !== 'Old':
        setBlogsOrder({ title: 'Old', blogs: [...blogs] });
        break;
      case e.target.innerText === 'New' && blogsOrder.title !== 'New':
        setBlogsOrder({ title: 'New', blogs: reversedBlogs });
        break;
      default:
        break; // Do nothing
    }
  };

  const pinnedUp = blogsOrder.blogs.sort((a, b) => {
    return a.pinned > b.pinned ? -1 : 1;
  });

  const sortBlogs = (blog) => {
    return (
      <div className="blog-preview" key={blog._id}>
        <Link to={`/blogs/${blog._id}`}>
          <div className="top-bar">
            <ProfilePicture className="author-picture" src={`/profile-pictures/${blog.authorID}`} />
            <div>
              <p className="author-text">{blog.author}</p>
              <p className="time-posted">{blog.date}</p>
            </div>
            {blog.pinned && <div className="blog-pin">📌 Pinned</div>}
          </div>
          <h2 className="blog-title">{blog.title}</h2>
          <h4 className="blog-description">{blog.description}</h4>
        </Link>
      </div>
    );
  };

  return (
    <div className="blogs">
      <Sort blogsOrder={blogsOrder} handleSort={handleSort} />
      <div className="blog-list">{blogsOrder.blogs.map((blog) => sortBlogs(blog))}</div>
    </div>
  );
}

export default BlogList;
