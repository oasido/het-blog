import { Link } from 'react-router-dom';

function BlogList({ blogs }) {
  const reversedBlogs = [...blogs].reverse(); // New blogs show on top
  console.log(reversedBlogs);
  return (
    <div className="blog-list">
      {reversedBlogs.map((blog) => (
        <div className="blog-preview" key={blog._id}>
          <Link to={`/blogs/${blog._id}`}>
            <div className="top-bar">
              <img className="author-picture" src="https://i.imgur.com/a3QC4si.png" alt="user avatar" />
              <div>
                <p className="author-text">{blog.author}</p>
                <p className="time-posted">{blog.date}</p>
              </div>
            </div>
            <h2 className="blog-title">{blog.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
