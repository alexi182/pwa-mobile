import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';

import { registerSW } from 'virtual:pwa-register';

if ('serviceWorker' in navigator) {
  registerSW({ immediate: true });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
