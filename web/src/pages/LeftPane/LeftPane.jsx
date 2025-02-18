import styles from './LeftPane.module.css';
import { NavLink } from 'react-router';

export function LeftPane() {
  return (
    <div className={styles.leftPane}>
      <img
        src="/MigraCodeLogo.png"
        alt="MigraCode logo"
        className={styles.logo}
      />
      <div className={styles.navigation}>
        <NavLink to="/tasks" end>
          Task manager
        </NavLink>
        <p>Project view</p>
        <NavLink to="/tasks/new-task" end>
          Add a task
        </NavLink>
      </div>
    </div>
  );
}
