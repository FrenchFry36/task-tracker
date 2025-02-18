import { Outlet } from 'react-router';
import styles from './TaskLayout.module.css';
import { LeftPane } from '../LeftPane/LeftPane';

export function TaskLayout() {
  return (
    <div className={styles.layout}>
      <LeftPane />
      <div className={styles.second}>
        <Outlet />
      </div>
    </div>
  );
}
