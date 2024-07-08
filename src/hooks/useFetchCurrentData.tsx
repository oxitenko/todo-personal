import { useEffect, useState } from 'react';
import { fetchData } from '../api/api';
import store from '../store/todoStore';
import { loading, failed, success } from '../utils/constants';

export const useFetchCurrentData = () => {
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const getTodos = async (): Promise<void> => {
    setStatus(loading);
    try {
      const data = await fetchData();
      store.fetchTodos(data);
      setStatus(success);
    } catch (e) {
      setStatus(failed);
      setError(`Error: ${e}`);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return { getTodos, status, error };
};
