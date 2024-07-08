import { fireEvent, render, screen } from '@testing-library/react';

import Filter from './Filter';

describe('Filter', () => {
  it('should render ul', () => {
    render(<Filter currentFilter="all" onFilterChange={jest.fn()} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('should render li', () => {
    render(<Filter currentFilter="all" onFilterChange={jest.fn()} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('should render li with correct className', () => {
    render(<Filter currentFilter="all" onFilterChange={jest.fn()} />);
    const element = screen.getAllByRole('listitem');
    expect(element.map((item) => item.className)).toEqual([
      'filter active',
      'filter',
      'filter',
    ]);
  });
  it('shoudl inwoke onFilterChange', () => {
    const onFilterChange = jest.fn();
    render(<Filter currentFilter="all" onFilterChange={onFilterChange} />);
    const element = screen.getAllByRole('listitem');
    fireEvent.click(element[0]);
    expect(onFilterChange).toHaveBeenCalledTimes(1);
  });
});
