import styles from './ToDoItem.module.css';
import { observer } from 'mobx-react';
import store from '../../store/todoStore';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import clsx from 'clsx';

interface IToDoItem {
  item: {
    id: string | number;
    title: string;
    completed: boolean;
  };
}

const ToDoItem = observer(({ item }: IToDoItem) => {
  return (
    <li className={styles.item}>
      <label>
        <input
          className={styles.checkbox}
          id="checkbox"
          type="checkbox"
          checked={item.completed}
          onChange={() => store.completedTodo(item.id)}
        />
        <span className={styles.checkboxStyle}></span>
      </label>
      <h3
        className={clsx(styles.subtitle, {
          [styles.subtitleCheck]: item.completed,
        })}
      >
        {item.title}
      </h3>
      <button className={styles.remove} onClick={() => store.remove(item.id)}>
        <AiOutlineCloseCircle color="white" fontSize={20} cursor="pointer" />
      </button>
    </li>
  );
});

export default ToDoItem;
