import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@cloudscape-design/global-styles/index.css';
import AppComponent from '@/app/app.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppComponent />
  </React.StrictMode>
);
