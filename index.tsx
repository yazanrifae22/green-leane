import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// === i18n INITIALIZATION - Must be imported before App ===
import './i18n';
import { LanguageProvider } from './contexts/LanguageContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* LanguageProvider wraps App for RTL/LTR context */}
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
