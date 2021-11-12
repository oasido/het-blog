import { useParams } from 'react-router';
import useFetch from './useFetch';
import ReactLoading from 'react-loading';
import NotFound from './NotFound';

const BlogItself = () => {
  const { id } = useParams();
  const { data: blog, isLoading } = useFetch('http://localhost:8000/blogs/' + id);

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
            <p>{blog.body}</p>
          </article>
        )}
      </div>
    </div>
  );
};

export default BlogItself;
