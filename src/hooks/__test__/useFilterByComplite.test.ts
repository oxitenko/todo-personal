import { renderHook, act } from '@testing-library/react';

import { useFilterByComplite } from '../useFilterByComplite';
import { activeTodos, allTodos, completedTodos } from '../../utils/constants';
import { IToDo } from '../../store/todoStore';

const todos: IToDo[] = [
  { id: 1, title: 'Todo 1', completed: false },
  { id: 2, title: 'Todo 2', completed: true },
  { id: 3, title: 'Todo 3', completed: false },
  { id: 4, title: 'Todo 4', completed: true },
];

describe('useFilterByComplite', () => {
  it('shold return object with current properties', () => {
    const { result } = renderHook(useFilterByComplite);
    expect(result.current).toHaveProperty('currentFilter');
    expect(result.current).toHaveProperty('handleFilterChange');
    expect(result.current).toHaveProperty('filterToDo');
    expect(typeof result.current.currentFilter).toBe('string');
    expect(typeof result.current.handleFilterChange).toBe('function');
    expect(typeof result.current.filterToDo).toBe('function');
  });

  it('should initialize with the correct filter', () => {
    const { result } = renderHook(useFilterByComplite);
    expect(result.current.currentFilter).toBe(allTodos);
  });

  it('should change filter correctly', () => {
    const { result } = renderHook(useFilterByComplite);

    act(() => {
      result.current.handleFilterChange(activeTodos);
    });
    expect(result.current.currentFilter).toBe(activeTodos);

    act(() => {
      result.current.handleFilterChange(completedTodos);
    });
    expect(result.current.currentFilter).toBe(completedTodos);
  });

  it('should filter todos correctly', () => {
    const { result } = renderHook(useFilterByComplite);

    expect(result.current.filterToDo(allTodos, todos)).toEqual(todos);
    expect(result.current.filterToDo(activeTodos, todos)).toEqual([
      { id: 1, title: 'Todo 1', completed: false },
      { id: 3, title: 'Todo 3', completed: false },
    ]);
    expect(result.current.filterToDo(completedTodos, todos)).toEqual([
      { id: 2, title: 'Todo 2', completed: true },
      { id: 4, title: 'Todo 4', completed: true },
    ]);
  });
  it('should return all todos if filter is invalid', () => {
    const { result } = renderHook(useFilterByComplite);

    expect(result.current.filterToDo('invalid', todos)).toEqual(todos);
  });
});
