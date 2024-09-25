import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css'; // Import custom CSS
import { ThemeProvider } from '@material-tailwind/react';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
