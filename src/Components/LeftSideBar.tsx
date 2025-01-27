import React from 'react';
import { MessageCircle, ShoppingCart, Clipboard, Users } from 'react-feather';
import { useDispatch } from 'react-redux';
import { SideBarItem } from './SideBar/SideBarItem';
import {
  toggleMouseEntered,
  toggleMouseExit,
} from '../features/SideBar/SideBarSlice';
import { UserProfile } from './SideBar/UserProfile';

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
              <SideBarItem text="الصفحة الرئيسية" link="/">
                <ShoppingCart size={26} />
              </SideBarItem>
              {/* WEb Apps */}
              <p>لوحه التحكم</p>
              <SideBarItem text="المنتجات" link="AllProducts">
                <MessageCircle size={26} />
              </SideBarItem>
              <SideBarItem text="العملاء" link="AllCustomers">
                <Users size={26} />
              </SideBarItem>
              <SideBarItem text="جميع الطلبات " link="AllOrderLayOut">
                <Clipboard />
              </SideBarItem>
            </ul>
          </section>
        </div>
      </aside>
    </>
  );
};
