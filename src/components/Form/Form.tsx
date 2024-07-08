import styles from './Form.module.css';
import store from '../../store/todoStore';
import { observer } from 'mobx-react';
import { IoIosAdd } from 'react-icons/io';
import React from 'react';
import Input from '../Input/Input';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  FormProvider,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../utils/schema';

const Form: React.FC = observer(() => {
  const methods = useForm({ resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      if (data.todo.trim() === '') {
        methods.setError('todo', { message: 'This field is required' });
        return;
      }
      await store.addTodo(data.todo);
      methods.reset();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <Input id={'todo-input'} placeholder="Create a new todo" type="text" />
        <button className={styles.button} type="submit">
          <IoIosAdd color="white" size={50} />
        </button>
      </form>
      <div className={styles.errorContainer}>
        {methods.formState.errors.todo && (
          <span className={styles.error} role="alert">
            {methods.formState.errors.todo.message}
          </span>
        )}
      </div>
    </FormProvider>
  );
});

export default Form;
