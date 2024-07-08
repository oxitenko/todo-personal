import { observer } from 'mobx-react';
import React from 'react';
import store from '../../store/todoStore';
import styles from './ToDoList.module.css';
import ToDoItem from '../ToDoItem/ToDoItem';
import Loader from '../Loader/Loader';
import { IToDo } from '../../store/todoStore';

interface Props {
  currentFilter: string;
  status: string;
  error: string | null;
  onFilter: (type: string, todos: IToDo[]) => IToDo[];
}

const TodoList: React.FC<Props> = observer(
  ({ currentFilter, status, error, onFilter }: Props) => {
    return (
      <ul className={styles.list}>
        {status === 'loading' && <Loader />}
        {status === 'failed' && <p className={styles.error}>{error}</p>}
        {status === 'success' &&
          onFilter(currentFilter, store?.todos).map((item) => {
            return <ToDoItem key={item.id} item={item} />;
          })}
      </ul>
    );
  },
);

export default TodoList;
