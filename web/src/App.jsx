import { useState } from 'react';
import { TaskList } from './components/domains/task/TaskList/TaskList';
import { TaskForm } from './components/domains/task/TaskForm/TaskForm';

function App() {
  const [tasks, setTasks] = useState([
    {
      title: 'Re-work UI/UX',
      priority: 'Low',
      releaseDate: '12/05/2025',
      assignedTo: 'Said, Rachael',
      projectName: 'Time App',
    },
    {
      title: 'Dark mode toggle',
      priority: 'High',
      releaseDate: '09/03/2025',
      assignedTo: 'Umair, Precious',
      projectName: 'ASA Darkmode Feature',
    },
    {
      title: 'Accessibility checks',
      priority: 'Medium',
      releaseDate: '15/04/2025',
      assignedTo: 'Michael, Ricardo',
      projectName: 'Time App',
    },
    {
      title: 'Notification integration',
      priority: 'High',
      releaseDate: '11/03/2025',
      assignedTo: 'Ebtesam, Deborah',
      projectName: 'Time App',
    },
  ]);

  function createTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  return (
    <>
      <TaskList taskItems={tasks} />
      <TaskForm handleClick={createTask} />
    </>
  );
}

export default App;
