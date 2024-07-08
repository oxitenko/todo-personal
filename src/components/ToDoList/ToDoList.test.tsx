import { render, screen } from '@testing-library/react';
import store, { IToDo } from '../../store/todoStore';
import ToDoList from './ToDoList';

jest.mock('../../store/todoStore', () => ({
  todos: [
    { id: 1, title: 'Test Todo 1', completed: false },
    { id: 2, title: 'Test Todo 2', completed: true },
  ],
}));

jest.mock(
  '../ToDoItem/ToDoItem',
  () => (props: { item: { id: number; title: string; completed: boolean } }) =>
    <li data-testid="todo-item">{props.item.title}</li>,
);

jest.mock('../Loader/Loader', () => () => <div>Loading...</div>);

const mockFilter = jest.fn((_filter: string, todos: IToDo[]) => todos);

const renderComponent = (status: string, error: string | null = null) => {
  render(
    <ToDoList
      currentFilter="all"
      status={status}
      error={error}
      onFilter={mockFilter}
    />,
  );
};

describe('ToDoList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Loader component when status is loading', () => {
    renderComponent('loading');

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message when status is failed', () => {
    const errorMessage = 'Failed to load todos';
    renderComponent('failed', errorMessage);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders ToDoItem components when status is success', () => {
    renderComponent('success');

    const todoItems = screen.getAllByTestId('todo-item');
    expect(todoItems).toHaveLength(2);
    expect(todoItems[0]).toHaveTextContent('Test Todo 1');
    expect(todoItems[1]).toHaveTextContent('Test Todo 2');
  });

  it('calls onFilter with the correct arguments', () => {
    renderComponent('success');

    expect(mockFilter).toHaveBeenCalledWith('all', store.todos);
  });
});
