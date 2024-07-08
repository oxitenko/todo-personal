import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import store from '../../store/todoStore';
import Form from './Form';

jest.mock('../../store/todoStore', () => ({
  addTodo: jest.fn(),
}));

describe('Form', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
  });

  it('renders the form elements correctly', () => {
    render(<Form />);

    expect(
      screen.getByPlaceholderText('Create a new todo'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('displays error when trying to submit empty input', async () => {
    render(<Form />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'This field is required',
      );
    });

    expect(store.addTodo).not.toHaveBeenCalled();
  });

  it('calls addTodo on valid submission', async () => {
    const todoText = 'New Todo';
    render(<Form />);

    fireEvent.change(screen.getByPlaceholderText('Create a new todo'), {
      target: { value: todoText },
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(store.addTodo).toHaveBeenCalledWith(todoText);
    });
  });

  it('handles form submission error', async () => {
    const todoText = 'New Todo';
    const error = new Error('Submission failed');
    (store.addTodo as jest.Mock).mockRejectedValueOnce(error);

    render(<Form />);

    fireEvent.change(screen.getByPlaceholderText('Create a new todo'), {
      target: { value: todoText },
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(store.addTodo).toHaveBeenCalledWith(todoText);
    });
    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith(error);
    });
  });
  it('displays error when input is only whitespace', async () => {
    render(<Form />);

    fireEvent.change(screen.getByPlaceholderText('Create a new todo'), {
      target: { value: '   ' },
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'This field is required',
      );
    });
  });

  it('renders the error message correctly', async () => {
    render(<Form />);

    const inputElement = screen.getByPlaceholderText('Create a new todo');
    fireEvent.change(inputElement, { target: { value: '' } });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});
