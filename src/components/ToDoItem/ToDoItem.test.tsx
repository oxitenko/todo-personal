import { render, screen, fireEvent } from '@testing-library/react';
import store from '../../store/todoStore';
import ToDoItem from './ToDoItem';

jest.mock('../../store/todoStore', () => ({
  completedTodo: jest.fn(),
  remove: jest.fn(),
}));

const mockItem = {
  id: 1,
  title: 'Test Todo',
  completed: false,
};

describe('ToDoItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the ToDoItem component correctly', () => {
    render(<ToDoItem item={mockItem} />);

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls store.completedTodo when the checkbox is clicked', () => {
    render(<ToDoItem item={mockItem} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(store.completedTodo).toHaveBeenCalledWith(mockItem.id);
  });

  it('calls store.remove when the remove button is clicked', () => {
    render(<ToDoItem item={mockItem} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(store.remove).toHaveBeenCalledWith(mockItem.id);
  });

  it('applies the correct class names based on the completed state', () => {
    const { rerender } = render(<ToDoItem item={mockItem} />);
    const title = screen.getByText('Test Todo');

    expect(title).not.toHaveClass('subtitleCheck');

    const completedItem = { ...mockItem, completed: true };
    rerender(<ToDoItem item={completedItem} />);

    expect(title).toHaveClass('subtitleCheck');
  });
});
