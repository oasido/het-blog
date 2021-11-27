// import { useEffect } from 'react';
import ReactLoading from 'react-loading';
import BlogList from './BlogList';
import useFetch from './useFetch';

function Home() {
  let { data: blogs, isLoading } = useFetch('/api/blogs');

  if ((blogs || []).length === 0) {
    blogs = null;
  }

  return (
    <div className="home">
      {isLoading && (
        <div>
          <ReactLoading className="loading" color="#000" type="spin" />
          <div className="loading">Loading, please wait...</div>
        </div>
      )}
      {blogs && <BlogList blogs={blogs} title="All Blogs" />}
      {!blogs && <p>There are currently no blogs available.</p>}
    </div>
  );
}

export default Home;
