import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { BrowserRouter, Routes, Route } from 'react-router';

import { TaskLayout } from './pages/TaskLayout/TaskLayout.jsx';
import { TaskForm } from './components/domains/task/TaskForm/TaskForm';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskLayout />}>
          <Route index element={<></>} />
        </Route>
        <Route path="/tasks" element={<TaskLayout />}>
          <Route index element={<App />} />
          <Route path="new-task" element={<TaskForm />} />
        </Route>
        <Route path="/new-task" element={<TaskLayout />}>
          <Route index element={<TaskForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
