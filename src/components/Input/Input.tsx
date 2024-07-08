import clsx from 'clsx';
import styles from './Input.module.css';
import { useFormContext } from 'react-hook-form';

interface Props {
  inputClassName?: string;
  type: string;
  id: string;
  placeholder: string;
}

const Input: React.FC<Props> = ({
  inputClassName,
  type,
  id,
  placeholder,
}: Props) => {
  const { register } = useFormContext();
  return (
    <input
      {...register('todo')}
      className={clsx(inputClassName, styles.input)}
      type={type}
      placeholder={placeholder}
      id={id}
    />
  );
};

export default Input;
