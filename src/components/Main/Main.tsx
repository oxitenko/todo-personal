import styles from './Main.module.css';
import { observer } from 'mobx-react';
import TodoList from '../ToDoList/ToDoList';
import Form from '../Form/Form';
import Counter from '../Counter/Counter';
import Filter from '../Filter/Filter';
import Title from '../Title/Title';
import { useFetchCurrentData } from '../../hooks/useFetchCurrentData';
import { useFilterByComplite } from '../../hooks/useFilterByComplite';
import { WrapperContent, WrapperFilter, WrapperMain } from '../Wrapper/Wrapper';

const Main: React.FC = observer(() => {
  const { status, error } = useFetchCurrentData();
  const { currentFilter, handleFilterChange, filterToDo } =
    useFilterByComplite();

  return (
    <main className={styles.todo}>
      <Title children="TODO" />
      <WrapperMain>
        <WrapperContent>
          <Form />
          <TodoList
            currentFilter={currentFilter}
            status={status}
            error={error}
            onFilter={filterToDo}
          />
          <Counter />
        </WrapperContent>
        <WrapperFilter>
          <Filter
            currentFilter={currentFilter}
            onFilterChange={handleFilterChange}
          />
        </WrapperFilter>
      </WrapperMain>
    </main>
  );
});

export default Main;
