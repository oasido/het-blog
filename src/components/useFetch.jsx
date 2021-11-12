import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const myAbortController = new AbortController();

    // setTimeout(() => {
    fetch(url, { signal: myAbortController.signal })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          setError(404);
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log('ERR:' + err.message);
        setIsLoading(false);
        setError(err);
      });
    // }, 1000);

    return () => {
      myAbortController.abort();
    };
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
