import { useState } from 'react';

export const usePostData = (endpoint) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async (newTask) => {
    try {
      const response = fetch(`http://localhost:3000/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      setData(data);
      return data;
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
