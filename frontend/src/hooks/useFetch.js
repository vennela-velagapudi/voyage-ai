import { useState, useCallback } from 'react';

/**
 * Custom hook to execute asynchronous functions with status tracking
 */
export function useFetch(asyncFunction) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const response = await asyncFunction(...args);
        setData(response);
        return response;
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'An error occurred');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction]
  );

  return { data, loading, error, execute };
}
