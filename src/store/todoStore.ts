import { action, computed, makeObservable, observable } from 'mobx';
import uniqid from 'uniqid';

export interface IToDo {
  userId?: number;
  id: string | number;
  title: string;
  completed: boolean;
}

export class ToDoStore {
  todos: IToDo[] = [];

  constructor() {
    makeObservable(this, {
      fetchTodos: action,
      todos: observable,
      totalTodosCount: computed,
      completedTodosCount: computed,
      addTodo: action,
      remove: action,
      completedTodo: action,
    });
  }
  fetchTodos(todo: IToDo[]) {
    this.todos = todo;
  }
  addTodo(todo: string) {
    this.todos.push({
      id: uniqid(),
      title: todo,
      completed: false,
    });
  }

  get completedTodosCount() {
    return this.todos.filter((todo) => todo.completed).length;
  }

  get totalTodosCount() {
    return this.todos.length;
  }

  remove(id: string | number) {
    this.todos = this.todos.filter((item) => item.id !== id);
  }

  completedTodo(id: string | number) {
    this.todos = this.todos.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item,
    );
  }
}

export default new ToDoStore();
