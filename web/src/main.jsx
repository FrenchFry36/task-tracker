import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { BrowserRouter, Routes, Route } from 'react-router';

import { DataFetchingDemoPage } from './pages/DataFetchingDemoPage.jsx';
import { TaskLayout } from './pages/TaskLayout/TaskLayout.jsx';
import { TaskForm } from './components/domains/task/TaskForm/TaskForm';

async function enableMocking() {
  if (import.meta.env === 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    onUnhandledRequest: 'bypass', // Allows non-mocked requests to pass through
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TaskLayout />}>
            <Route index element={<></>} />
          </Route>
          <Route path="/tasks" element={<TaskLayout />}>
            <Route index element={<App />} />
          </Route>
          <Route path="/new-task" element={<TaskLayout />}>
            <Route index element={<TaskForm />} />
            <Route path="/datafetching" element={<DataFetchingDemoPage />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>,
  );
});
