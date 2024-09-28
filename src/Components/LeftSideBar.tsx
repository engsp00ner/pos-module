import React from 'react';
import { MessageCircle, ShoppingCart, Clipboard } from 'react-feather';
import { useDispatch } from 'react-redux';
import { UserProfile } from './SideBar/UserProfile';
import { SideBarItem } from './SideBar/SideBarItem';
import {
  toggleMouseEntered,
  toggleMouseExit,
} from '../features/SideBar/SideBarSlice';

interface SideProps {
  test?: string;
}
export const LeftSideBar: React.FC<SideProps> = () => {
  const dispatch = useDispatch();

  const HandleMouseEnter = () => {
    dispatch(toggleMouseEntered());
  };
  const HandleMouseExit = () => {
    dispatch(toggleMouseExit());
  };
  return (
    <>
      {/* Left side column. contains the logo and sidebar  */}
      <aside className="main-sidebar">
        <div className="slimScrollDiv">
          {/*  sidebar */}
          <section
            className="sidebar"
            style={{
              overflow: 'hidden',
              width: 'auto',
            }}
            onMouseEnter={() => HandleMouseEnter()}
            onMouseLeave={() => HandleMouseExit()}
          >
            {/* //sidebar menu */}
            <ul className="sidebar-menu tree" data-widget="tree">
              <UserProfile />
              <SideBarItem text="Dashboard " link="#" classname="header" />
              <SideBarItem text="الصفحة الرئيسية" link="/">
                <ShoppingCart size={26} />
              </SideBarItem>
              {/* WEb Apps */}
              <SideBarItem text="Web Apps " link="#" classname="header" />
              <SideBarItem text="المنتجات" link="AllProducts">
                <MessageCircle size={26} />
              </SideBarItem>
              <SideBarItem text="جميع الطلبات " link="AllOrderLayOut">
                <Clipboard />
              </SideBarItem>
            </ul>
          </section>

          <div className="control-sidebar-bg" />
        </div>
      </aside>
    </>
  );
};
