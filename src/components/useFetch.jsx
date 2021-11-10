import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const myAbortController = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: myAbortController.signal })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsLoading(false);
        })
        .catch((err) => {
          // console.log(err.message);
        });
    }, 1000);

    return () => {
      myAbortController.abort();
    };
  }, [url]);

  return { data, isLoading };
};

export default useFetch;
