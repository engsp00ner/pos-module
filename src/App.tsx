import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './Store';
import { initializeUser } from './features/Auth/authSlice';
import { AdminDashBoard } from './Pages/AdminDashBoard';
import Login from './Pages/Login';
import { HomePage } from './Pages/HomePage';
import MainLayout from './Components/MainLayOut';
import AllOrderLayOut from './Components/EditOrders/AllOrderLayOut';
import ListAllProductsPage from './orders/ListAllProductsPage';
import ListAllOrders from './Components/EditOrders/ListAllOrders';
import ListAllCustomers from './Customers/Customers';
import PrivateRoute from './routes/PrivateRoute';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Dispatch initializeUser with the token to validate and set user in state
      dispatch(initializeUser(token));
    }
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public route for Login */}
        <Route path="/login" element={<Login />} />
        {/* Private Route Wrapping */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/AdminDashBoard" element={<AdminDashBoard />} />
            <Route path="/AllOrders" element={<AllOrderLayOut />} />
            <Route path="/AllOrderLayOut" element={<ListAllOrders />} />
            <Route path="/AllCustomers" element={<ListAllCustomers />} />
            <Route path="/AllProducts" element={<ListAllProductsPage />} />
          </Route>
        </Route>
        {/* Fallback for unknown routes
        <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
