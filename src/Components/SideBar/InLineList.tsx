import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../Store';
import InLineListElement from './InLineListElement';
import { logout } from '../../features/Auth/authSlice'; // Assuming you have a logout action

const InLineList: React.FC = () => {
  // Access the Redux state using useSelector
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');

    // Dispatch the logout action to clear user from Redux state
    dispatch(logout());

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <ul className="list-inline profile-setting mt-10 mb-0 d-flex justify-content-between pt-10">
      {user ? <p>{user.displayname}</p> : <p>No user logged in</p>}

      {/* OnClick event to trigger logout */}
      <InLineListElement
        link="#"
        Toggle="tooltip"
        Title="تسجيل الخروج"
        Placement="top"
      >
        <LogOut onClick={handleLogout} /> {/* Add onClick handler */}
      </InLineListElement>
    </ul>
  );
};

export default InLineList;
