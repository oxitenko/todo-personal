import { useState } from 'react';
import { IToDo } from '../store/todoStore';
import { allTodos, activeTodos, completedTodos } from '../utils/constants';

export const useFilterByComplite = () => {
  const [currentFilter, setCurrentFilter] = useState<string>(allTodos);

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
  };

  function filterToDo(type: string, todos: IToDo[]): IToDo[] {
    switch (type) {
      case allTodos:
        return todos;
      case activeTodos:
        return todos.filter((item) => !item.completed);
      case completedTodos:
        return todos.filter((item) => item.completed);
      default:
        return todos;
    }
  }

  return {
    currentFilter,
    handleFilterChange,
    filterToDo,
  };
};
