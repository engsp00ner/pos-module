import React from 'react';
import { Link } from 'react-router-dom';

export const NavHeader: React.FC = () => {
  return (
    <nav className="navbar navbar-static-top pl-10">
      <div className="app-menu">
        <ul className="header-megamenu nav">
          <li className="btn-group nav-item d-md-none">
            <Link
              to="index.html#"
              className="waves-effect waves-light nav-link rounded"
              role="button"
            >
              <i className="nav-link-icon mdi mdi-menu text-dark" />
            </Link>
          </li>
          <li className="btn-group nav-item d-md-none">
            <Link
              to="index.html#"
              className="waves-effect waves-light nav-link rounded"
              role="button"
            >
              <i className="nav-link-icon mdi mdi-menu text-dark" />
            </Link>
          </li>
          <li className="btn-group nav-item d-md-none">
            <Link
              to="index.html#"
              className="waves-effect waves-light nav-link rounded"
              role="button"
            >
              <i className="nav-link-icon mdi mdi-menu text-dark" />
            </Link>
          </li>
        </ul>
        <div className="navbar-custom-menu r-side">
          <ul className="nav navbar-nav">
            <li className="search-bar">
              <div className="lookup lookup-circle lookup-right">
                <input type="text" id="s" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
