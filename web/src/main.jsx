import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.jsx';

import './index.css';
import { DataFetchingDemoPage } from './pages/DataFetchingDemoPage.jsx';
import { TempPage } from './pages/TempPage.jsx';

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
          <Route path="/" element={<App />} />
          <Route path="/temppage" element={<TempPage />} />
          <Route path="/datafetching" element={<DataFetchingDemoPage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </StrictMode>,
  );
});
