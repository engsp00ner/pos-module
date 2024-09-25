import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Maximize, Minimize } from 'react-feather';
import { Link, Outlet } from 'react-router-dom';
import { LeftSideBar } from './LeftSideBar';
import { RootState } from '../Store';
import Header from './Header';
import { toggleFullscreen } from '../features/MainSlice/fullScreenSlice';

const MainLayout: React.FC = () => {
  const isActive = useSelector((state: RootState) => state.sidebar.isActive);
  const isMouseEntered = useSelector(
    (state: RootState) => state.sidebar.isMouseEntered
  );
  const isFullScreen = useSelector(
    (state: RootState) => state.fullScreen.isFullscreen
  );
  const dispatch = useDispatch();

  // Function to handle fullscreen togglingm
  const handleFullScreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    dispatch(toggleFullscreen()); // Update the Redux state
  };

  // State to handle the sidebar layout classes
  const [mystyle, SetMyStyle] = useState(
    'sidebar-mini fixed sidebar-mini-expand-feature'
  );

  // Function to set the sidebar style based on its state
  const Setstyle = () => {
    if (isActive === true && isMouseEntered === false) {
      SetMyStyle(
        'sidebar-mini fixed sidebar-mini-expand-feature sidebar-collapse'
      );
    } else if (isActive === true && isMouseEntered === true) {
      SetMyStyle(
        'sidebar-mini fixed sidebar-mini-expand-feature sidebar-expanded-on-hover'
      );
    } else {
      SetMyStyle('sidebar-mini fixed sidebar-mini-expand-feature');
    }
  };

  // Update the sidebar style when the state changes
  useEffect(() => {
    Setstyle();
  }, [isActive, isMouseEntered]);

  return (
    <div className={mystyle}>
      {/* Header Component */}
      <Header>
        <Link to="#" type="button" onClick={handleFullScreenToggle}>
          {isFullScreen ? <Minimize /> : <Maximize />}
        </Link>
      </Header>

      {/* Sidebar Component */}
      <LeftSideBar />

      {/* Main content area */}
      <div className="content-wrapper">
        <section className="content">
          {/* Outlet renders the matched child route here */}
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default MainLayout;
