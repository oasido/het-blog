import ReactLoading from 'react-loading';
import BlogList from './BlogList';
import useFetch from './useFetch';

function Home() {
  const { data: blogs, isLoading } = useFetch('http://localhost:8000/blogs');

  return (
    <div className="home">
      {isLoading && (
        <div>
          <ReactLoading className="loading" type="spin" color="#fff" />
          <div className="loading">Loading, please wait...</div>
        </div>
      )}
      {blogs && <BlogList blogs={blogs} title="All Blogs" />}
    </div>
  );
}

export default Home;
