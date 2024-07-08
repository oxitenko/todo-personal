import { render, screen } from '@testing-library/react';
import Title from './Title';

const text = 'TODO';

describe('Title', () => {
  it('should render title with text', () => {
    render(<Title>{text}</Title>);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('should render title with correct className', () => {
    render(<Title>{text}</Title>);
    const element = screen.getByText(text);
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('title');
  });
});
