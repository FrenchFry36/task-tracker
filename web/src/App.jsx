import { useEffect, useState } from 'react';
import { TaskList } from './components/domains/task/TaskList/TaskList';
// import { TaskForm } from './components/domains/task/TaskForm/TaskForm';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data);
    };
    fetchData();
  }, []);
  const [tasks, setTasks] = useState([]);

  // function createTask(newTask) {
  //   setTasks([...tasks, newTask]);
  // }

  return (
    <>
      <TaskList taskItems={tasks} />
    </>
  );
}

export default App;
