import { screen, render } from '@testing-library/react';
import Input from './Input';
import { FormProvider, useForm } from 'react-hook-form';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('Input', () => {
  it('renders the input element correctly', () => {
    render(
      <Wrapper>
        <Input type="text" id="test-input" placeholder="Test placeholder" />
      </Wrapper>,
    );
    const inputElement = screen.getByPlaceholderText('Test placeholder');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveAttribute('id', 'test-input');
  });

  it('applies the correct class names', () => {
    const inputClassName = 'custom-class';
    render(
      <Wrapper>
        <Input
          type="text"
          id="test-input"
          placeholder="Test placeholder"
          inputClassName={inputClassName}
        />
      </Wrapper>,
    );

    const inputElement = screen.getByPlaceholderText('Test placeholder');
    expect(inputElement).toHaveClass(inputClassName);
    expect(inputElement).toHaveClass('input');
  });
});
