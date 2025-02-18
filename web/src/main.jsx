import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { BrowserRouter, Routes, Route } from 'react-router';

import { TaskLayout } from './pages/TaskLayout/TaskLayout.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tasks" element={<TaskLayout />}>
          <Route index element={<>some</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
