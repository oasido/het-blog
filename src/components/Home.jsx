import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import BlogList from './BlogList';

function Home() {
  const [blogs, setBlog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/blogs')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBlog(data);
        setIsLoading(false);
      });
  }, []);

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
