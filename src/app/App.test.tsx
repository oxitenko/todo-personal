import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render with the Main component', () => {
    const { container } = render(<App />);
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
  });
});
