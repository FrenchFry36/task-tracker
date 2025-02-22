import { TaskItem } from '../TaskItem/TaskItem';
import styles from './TaskList.module.css';
import PropTypes from 'prop-types';

/*
Please create the <TaskList /> component following the design from the Figma file.
Please make sure to add styles using CSS Modules.
Create a taskItems array and return a list of <TaskItem /> components.
*/

function TaskList({ taskItems }) {
  return (
    <div className={styles.listWrapper}>
      {taskItems.map((task, index) => (
        <TaskItem key={index} {...task} />
      ))}
    </div>
  );
}

export { TaskList };

TaskList.propTypes = {
  taskItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      assignedTo: PropTypes.string.isRequired,
      projectName: PropTypes.string.isRequired,
    }),
  ),
};
