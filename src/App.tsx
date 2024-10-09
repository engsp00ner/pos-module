import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AdminDashBoard } from './Pages/AdminDashBoard';
import Login from './Pages/Login';
import { HomePage } from './Pages/HomePage';
import { store } from './Store';
import MainLayout from './Components/MainLayOut';
import AllOrderLayOut from './Components/EditOrders/AllOrderLayOut';
import ListAllProductsPage from './orders/ListAllProductsPage';
import ListAllOrders from './Components/EditOrders/ListAllOrders';
import ListAllCustomers from './Customers/Customers';
import LogIn from './Pages/LoginPage';

const App: React.FC = () => {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          {/* Public route for Login (no layout) */}
          <Route path="/Login" element={<LogIn />} />

          {/* Main layout route wrapping all other routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/AdminDashBoard" element={<AdminDashBoard />} />
            <Route path="/AllOrders" element={<AllOrderLayOut />} />
            <Route path="/AllOrderLayOut" element={<ListAllOrders />} />
            <Route path="/AllCustomers" element={<ListAllCustomers />} />
            <Route path="/AllProducts" element={<ListAllProductsPage />} />
          </Route>
        </Routes>
      </Provider>
    </Router>
  );
};
export default App;
