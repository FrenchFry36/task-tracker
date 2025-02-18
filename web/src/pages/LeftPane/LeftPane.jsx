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
        <p>Task manager</p>
        <p>Project view</p>
        <p>Add a task</p>
      </div>
    </div>
  );
}
