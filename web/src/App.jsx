import { TaskList } from './components/domains/task/TaskList/TaskList';
import { useFetchData } from './hooks/useFetchData';
// import { TaskForm } from './components/domains/task/TaskForm/TaskForm';

function App() {
  const { data: tasks, error, isLoading } = useFetchData('tasks');

  return (
    <>
      <TaskList taskItems={tasks} />
    </>
  );
}

export default App;
