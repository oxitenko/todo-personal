import styles from './Filter.module.css';
import clsx from 'clsx';
import { taskStatusArray } from '../../utils/constants';

interface IFilter {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

const Filter = ({ currentFilter, onFilterChange }: IFilter) => {
  return (
    <ul role="list" className={styles.filters}>
      {taskStatusArray.map((item) => (
        <li
          key={item}
          role="listitem"
          onClick={() => onFilterChange(item)}
          className={clsx(styles.filter, {
            [styles.active]: currentFilter === item,
          })}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default Filter;
