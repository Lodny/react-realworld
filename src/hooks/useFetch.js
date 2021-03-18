import { useState, useEffect } from 'react';

const useFetch = (callback, url, option = null) => {
  const [loading, setLoading] = useState(false);

  const fetchInitialData = async () => {
    setLoading(true);
    const response = await fetch(url, option);
    const initialData = await response.json();
    callback(initialData);
    setLoading(false);
    console.log('useFetch : fetchInitialData() : initialData : ', initialData);
  };

  useEffect(() => {
    console.log('useFetch : useEffect()');
    fetchInitialData();
  }, []);

  return loading;
};

export default useFetch;
