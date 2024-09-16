import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from 'react-feather';
import { Provider } from 'react-redux';
import { AdminDashBoard } from './Pages/AdminDashBoard';
import Login from './Pages/Login';
import { store } from './Store';

const App: React.FC = () => {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AdminDashBoard" element={<AdminDashBoard />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Provider>
    </Router>
  );
};
export default App;
