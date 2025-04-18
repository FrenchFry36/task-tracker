import styles from './TaskItem.module.css';
import PropTypes from 'prop-types';
import SunIcon from './SunIcon';
import PersIcon from './PersIcon';
/*
Please create the <TaskItem /> component following the design from the Figma file.
Please make sure to add styles using CSS Modules.
Add the necessary props to the component.
*/

// assigning styling for priorities
export function TaskItem({
  title,
  priority,
  release_date,
  assigned_to,
  project_name,
}) {
  const getPriorityClass = () => {
    if (priority === 'Low') return `${styles.lowPriority}`;
    if (priority === 'Medium') return `${styles.mediumPriority}`;
    if (priority === 'High') return `${styles.highPriority}`;
    return '';
  };

  return (
    <div className={styles.itemWrapper}>
      <div className={`${styles.title}`}>{title}</div>
      <div>
        <div className={`${styles.priority} ${getPriorityClass()}`}>
          {priority}
        </div>
      </div>
      <div className={`${styles.date}`}>
        <SunIcon />
        <div>{release_date}</div>
      </div>
      <div className={`${styles.assignedTo}`}>
        <PersIcon />
        <div>{assigned_to}</div>
      </div>
      <div className={`${styles.project}`}>{project_name}</div>
    </div>
  );
}

TaskItem.propTypes = {
  title: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  assigned_to: PropTypes.string.isRequired,
  project_name: PropTypes.string.isRequired,
};
