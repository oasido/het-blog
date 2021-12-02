import { Link } from 'react-router-dom';

function BlogList({ blogs, title }) {
  const reversedBlogs = [...blogs].reverse(); // New blogs show on top
  console.log(reversedBlogs);
  return (
    <div className="blog-list">
      <h2>{title}</h2>
      {reversedBlogs.map((blog) => (
        <div className="blog-preview" key={blog._id}>
          <Link to={`/blogs/${blog._id}`}>
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
