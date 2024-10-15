import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css'; // Import custom CSS
import { ThemeProvider } from '@material-tailwind/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './Store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);
