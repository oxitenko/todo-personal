import { ToDoStore } from './todoStore';

describe('ToDoStore', () => {
  let store: ToDoStore;

  beforeEach(() => {
    store = new ToDoStore();
  });

  it('should fetch todos', () => {
    const todos = [
      { id: 1, title: 'Test todo1', completed: false },
      { id: 2, title: 'Test todo2', completed: true },
    ];
    store.fetchTodos(todos);
    expect(store.todos).toEqual(todos);
  });

  it('should add todo', () => {
    const todoTitle = 'Test todo';
    store.addTodo(todoTitle);
    expect(store.todos.length).toBe(1);
    expect(store.todos[0].title).toBe(todoTitle);
    expect(store.todos[0].completed).toBe(false);
  });

  it('should remove todo', () => {
    const todoId = 1;
    store.todos.push({ id: todoId, title: 'Test todo', completed: false });
    store.remove(todoId);
    expect(store.todos).toHaveLength(0);
  });

  it('should handle removing non-existent todo', () => {
    const todoId = 1;
    store.todos.push({ id: todoId, title: 'Test todo', completed: false });
    store.remove(2);
    expect(store.todos).toHaveLength(1);
  });

  it('should complete todo', () => {
    const todoId = 1;
    store.todos.push({ id: todoId, title: 'Test todo', completed: false });
    store.completedTodo(todoId);
    expect(store.todos[0].completed).toBe(true);
  });

  it('should uncomplete todo', () => {
    const todoId = 1;
    store.todos.push({ id: todoId, title: 'Test todo', completed: true });
    store.completedTodo(todoId);
    expect(store.todos[0].completed).toBe(false);
  });

  it('should calculate completed todos count', () => {
    store.todos = [
      { id: 1, title: 'Test todo1', completed: true },
      { id: 2, title: 'Test todo2', completed: false },
    ];
    expect(store.completedTodosCount).toBe(1);
  });

  it('should calculate total todos count', () => {
    store.todos = [
      { id: 1, title: 'Test todo1', completed: true },
      { id: 2, title: 'Test todo2', completed: false },
    ];
    expect(store.totalTodosCount).toBe(2);
  });
});
