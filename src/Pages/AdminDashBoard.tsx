/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Maximize, Minimize } from 'react-feather';
import { Link } from 'react-router-dom';
import { LeftSideBar } from '../Components/LeftSideBar';
import { MainLayOut } from '../Components/MainLayOut';
import { RootState } from '../Store';
import Header from '../Components/Header';
import { toggleFullscreen } from '../features/MainSlice/fullScreenSlice';

export const AdminDashBoard: React.FC = () => {
  const isActive = useSelector((state: RootState) => state.sidebar.isActive);
  const isMouseEntered = useSelector(
    (state: RootState) => state.sidebar.isMouseEntered
  );
  const isFullScreen = useSelector(
    (state: RootState) => state.fullScreen.isFullscreen
  );
  const dispatch = useDispatch();
  const handleFullScreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    dispatch(toggleFullscreen()); // Update the Redux state
  };
  const [mystyle, SetMyStyle] = useState(
    'sidebar-mini fixed sidebar-mini-expand-feature'
  );
  const Setstyle = () => {
    if (isActive === true && isMouseEntered === false)
      SetMyStyle(
        'sidebar-mini fixed sidebar-mini-expand-feature sidebar-collapse'
      );
    else if (isActive === true && isMouseEntered === true) {
      SetMyStyle(
        'sidebar-mini fixed sidebar-mini-expand-feature sidebar-expanded-on-hover'
      );
    } else {
      SetMyStyle('sidebar-mini fixed sidebar-mini-expand-feature');
    }
  };
  useEffect(() => {
    Setstyle();
  }, [isActive, isMouseEntered]);

  return (
    <div className={mystyle}>
      <Header>
        <Link to="#" type="button" onClick={handleFullScreenToggle}>
          {isFullScreen ? <Minimize /> : <Maximize />}
        </Link>
      </Header>
      {/* <MainHeader/> */}
      <LeftSideBar />
      <MainLayOut />
      <aside className="main-sider">
        <section className="sidebar" />
      </aside>
    </div>
  );
};
