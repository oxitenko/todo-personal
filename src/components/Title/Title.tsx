import styles from './Title.module.css';

interface Props {
  children: React.ReactNode;
}

const Title: React.FC<Props> = ({ children }: Props) => {
  return <h1 className={styles.title}>{children}</h1>;
};

export default Title;
