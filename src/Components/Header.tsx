import { Link } from 'react-router-dom';
import { SideBarToggleButton } from './SideBar/SideBarToggleButton';
import { Notifications } from './Notifications';

interface Props {
  children?: React.ReactNode;
}

// Only default export, no named export
const Header: React.FC<Props> = ({ children }) => {
  return (
    <header className="main-header">
      <div className="d-flex align-items-center logo-box justify-content-between">
        {/* logo */}
        <Link to="/">
          <div className="logo-lg">
            <span className="light-logo">
              <img src="/assets/itemImages/logo1.png" alt="logo " />
            </span>
          </div>
        </Link>
        {/* Sidebar toggle button */}
        <SideBarToggleButton />
      </div>

      {/* Header Navbar */}
      <nav className="navbar navbar-static-top pl-10">
        <div className="app-menu">{children}</div>

        <div className="navbar-custom-menu r-side">
          <ul className="nav navbar-nav">
            {/* Search Bar */}
            <li className="search-bar">
              <div className="lookup lookup-circle lookup-right">
                <input type="text" name="s" />
              </div>
            </li>
            {/* Notifications */}
            <Notifications />
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
