import { useState } from 'react';

export const usePostData = (endpoint) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async (newTask) => {
    try {
      const response = fetch(`/api/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    fetchData,
    error,
    data,
  };
};
