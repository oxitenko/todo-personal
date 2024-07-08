import styles from './Wrapper.module.css';

export const WrapperMain = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.mainWrapper}>{children}</div>;
};

export const WrapperContent = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.contentWrapper}>{children}</div>;
};

export const WrapperFilter = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.filterWrapper}>{children}</div>;
};
