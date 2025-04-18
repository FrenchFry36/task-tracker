import { useState } from 'react';
import styles from './TaskForm.module.css';
import { usePostData } from '../../../../hooks/usePostData';

function TaskForm() {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskProject, setTaskProject] = useState('');
  const { error, data, fetchData } = usePostData('new-task');

  async function submitTask() {
    if (!taskTitle.trim() || !taskProject.trim()) {
      alert('Please enter both title and project name.');
      return;
    }

    const newTask = {
      title: taskTitle,
      priority: 'Medium',
      release_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      assigned_to: 'Unassigned',
      project_name: taskProject,
    };

    try {
      await fetchData(newTask);
      // Clear form only on success
      setTaskTitle('');
      setTaskProject('');
      alert('Task added successfully!');
    } catch (err) {
      console.error('Failed to add task:', err);
      alert('Failed to add task. Please try again.');
    }
  }

  return (
    <form className={styles.formWrapper}>
      <h1 className={styles.headingStyle}>New Task</h1>
      <fieldset className={styles.fieldsetStyle}>
        {/* Task title */}
        <label htmlFor="taskTitle" className={styles.taskLabelStyle}>
          Title
          <input
            type="text"
            id="taskTitle"
            className={styles.taskInputStyle}
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
        </label>

        {/* Project name */}
        <label htmlFor="taskProject" className={styles.taskLabelStyle}>
          Project
          <input
            type="text"
            id="taskProject"
            className={styles.taskInputStyle}
            value={taskProject}
            onChange={(e) => setTaskProject(e.target.value)}
            required
          />
        </label>
      </fieldset>
      <input
        type="button"
        value="Add task"
        className={styles.formButton}
        onClick={submitTask}
      />
    </form>
  );
}

export { TaskForm };
