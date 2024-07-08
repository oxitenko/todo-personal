import styles from './Counter.module.css'
import {observer} from 'mobx-react';
import React from 'react';
import store from '../../store/todoStore';

const Counter: React.FC = observer(() => {
    return (
        <div className={styles.counter}>
            <p className={styles.text}>Total: {store.totalTodosCount}</p>
            <p className={styles.text}>
                Tasks done: {store.completedTodosCount}
            </p>
        </div>
    );
});

export default Counter;