/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { Bell } from 'react-feather';
import { Link } from 'react-router-dom';
import { NotificationMenue } from './NotificationMenue';

export const Notifications: React.FC = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };
  return (
    <li className="dropdown notifications-menu">
      <Link
        to="#"
        className="waves-effect waves-light dropdown-toggle"
        onClick={toggleNotifications}
        title="Notifications"
      >
        <Bell />
      </Link>
      <ul
        className={`dropdown-menu animated bounceIn ${isNotificationsOpen ? 'show' : ''}`}
      >
        <li className="header">
          <div className="p-20">
            <div className="flexbox">
              <div>
                <h4 className="mb-0 mt-0">Notifications</h4>
              </div>
              <div>
                <a href="index.html#" className="text-danger">
                  Clear All
                </a>
              </div>
            </div>
          </div>
        </li>

        <li>
          {/* <!-- inner menu: contains the actual data --> */}
          <NotificationMenue />
        </li>
        <li className="footer">
          <a href="index.html#">View all</a>
        </li>
      </ul>
    </li>
  );
};
