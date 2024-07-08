import { loading, success, failed } from '../../utils/constants';
import { act, renderHook, waitFor } from '@testing-library/react';

import { useFetchCurrentData } from '../useFetchCurrentData';
import store from '../../store/todoStore';
import * as api from '../../api/api';

const apiSpy = jest.spyOn(api, 'fetchData');
jest.mock('../../store/todoStore', () => ({
  fetchTodos: jest.fn(),
}));

describe('useFetchCurrentData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an object with current properties', () => {
    const { result } = renderHook(useFetchCurrentData);

    expect(result.current).toHaveProperty('getTodos');
    expect(result.current).toHaveProperty('status');
    expect(result.current).toHaveProperty('error');

    expect(typeof result.current.getTodos).toBe('function');
    expect(typeof result.current.status).toBe('string');
    expect(typeof result.current.error).toBe('object');
  });

  it('should set status to loading and then to success on successful fetch', async () => {
    apiSpy.mockResolvedValueOnce([
      { id: 1, title: 'Todo 1', completed: false },
    ]);

    const { result } = renderHook(useFetchCurrentData);

    await waitFor(() => result.current.status === loading);
    await waitFor(() => result.current.status === success);

    expect(result.current.status).toBe(success);
    expect(result.current.error).toBeNull();
    expect(store.fetchTodos).toHaveBeenCalledWith([
      { id: 1, title: 'Todo 1', completed: false },
    ]);
  });

  it('should set status to loading and then to failed on fetch error', async () => {
    apiSpy.mockRejectedValueOnce(new Error('Fetch error'));

    const { result } = renderHook(useFetchCurrentData);

    await waitFor(() => result.current.status === loading);
    await waitFor(() => result.current.status === failed);

    expect(result.current.status).toBe(failed);
    expect(result.current.error).toBe('Error: Error: Fetch error');
    expect(store.fetchTodos).not.toHaveBeenCalled();
  });

  it('should be able to refetch data using getTodos function', async () => {
    apiSpy.mockResolvedValueOnce([
      { id: 1, title: 'Todo 1', completed: false },
    ]);

    const { result } = renderHook(useFetchCurrentData);

    await waitFor(() => result.current.status === loading);
    await waitFor(() => result.current.status === success);

    expect(result.current.status).toBe(success);

    apiSpy.mockResolvedValueOnce([{ id: 2, title: 'Todo 2', completed: true }]);

    act(() => {
      result.current.getTodos();
    });

    await waitFor(() => result.current.status === loading);
    await waitFor(() => result.current.status === success);

    expect(result.current.status).toBe(success);
    expect(store.fetchTodos).toHaveBeenCalledWith([
      { id: 2, title: 'Todo 2', completed: true },
    ]);
  });
});
