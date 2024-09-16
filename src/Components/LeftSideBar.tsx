import React from 'react';
import {
  MessageCircle,
  ShoppingCart,
  Clipboard,
  Calendar,
  Mail,
  Users,
  User,
  File,
  Grid,
  Layers,
  Lock,
} from 'react-feather';
import { useDispatch } from 'react-redux';
import { UserProfile } from './SideBar/UserProfile';
import { SideBarItem } from './SideBar/SideBarItem';
import { TreeSideBarItem } from './SideBar/TreeSideBarItem';
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

              <SideBarItem
                text="Dashboard "
                link="index.html"
                classname="header"
              />

              <SideBarItem text="Dashboard 1" link="index.html">
                <ShoppingCart size={26} />
              </SideBarItem>

              {/* WEb Apps */}
              <SideBarItem
                text="Web Apps "
                link="index.html"
                classname="header"
              />

              <SideBarItem text="chat" link="contact_app_chat.html">
                <MessageCircle size={26} />
              </SideBarItem>

              <SideBarItem text="Todo" link="extra_taskboard.html">
                <Clipboard />
              </SideBarItem>

              {/* Calender */}
              <SideBarItem text="Calendar" link="extra_calendar.html">
                <Calendar size={26} />
              </SideBarItem>

              {/* Mail Box */}
              <TreeSideBarItem HeaderText="MailBox" Icon={<Mail size={26} />}>
                <SideBarItem text="Inbox" link="mailbox_inbox.html">
                  <i className="ti-more" />
                </SideBarItem>

                <SideBarItem text="Compose" link="mailbox_inbox.html">
                  <i className="ti-more" />
                </SideBarItem>
                <SideBarItem text="Read" link="mailbox_inbox.html">
                  <i className="ti-more" />
                </SideBarItem>
              </TreeSideBarItem>

              {/* Contact */}
              <SideBarItem text="Contact" link="contact_app.html.html">
                <Users size={26} />
              </SideBarItem>

              {/* Pages */}
              <SideBarItem text="Pages " link="index.html" classname="header" />

              {/* User Pages */}
              <TreeSideBarItem
                HeaderText="User Pages"
                Icon={<User size={26} />}
              >
                <SideBarItem text="Invoice" link="invoice.html">
                  <i className="ti-more" />
                </SideBarItem>

                <SideBarItem text="invoicelist" link="invoicelist.html">
                  <i className="ti-more" />
                </SideBarItem>

                <SideBarItem text="Support Ticket" link="extra_app_ticket.html">
                  <i className="ti-more" />
                </SideBarItem>

                <SideBarItem text="User Profile" link="extra_profile.html">
                  <i className="ti-more" />
                </SideBarItem>

                <SideBarItem
                  text="Userlist Grid"
                  link="contact_userlist_grid.html"
                >
                  <i className="ti-more" />
                </SideBarItem>

                <SideBarItem text="Userlist" link="contact_userlist.html">
                  <i className="ti-more" />
                </SideBarItem>

                <SideBarItem text="FAQs" link="sample_faq.html">
                  <i className="ti-more" />
                </SideBarItem>
              </TreeSideBarItem>

              {/* Sample Pages */}
              <TreeSideBarItem
                HeaderText="Sample Pages"
                Icon={<File size={26} />}
              >
                <SideBarItem text="Blank" link="sample_blank.html">
                  <i className="ti-more" />
                </SideBarItem>

                <SideBarItem text="Coming Soon" link="sample_coming_soon.html">
                  <i className="ti-more" />
                </SideBarItem>

                <SideBarItem
                  text="Custom Scrolls"
                  link="sample_custom_scroll.html"
                >
                  <i className="ti-more" />
                </SideBarItem>

                <SideBarItem text="Gallery" link="sample_gallery.html">
                  <i className="ti-more" />
                </SideBarItem>

                <SideBarItem text="Lightbox Popup" link="sample_lightbox.html">
                  <i className="ti-more" />
                </SideBarItem>

                <SideBarItem text="Pricing" link="sample_pricing.html">
                  <i className="ti-more" />
                </SideBarItem>
              </TreeSideBarItem>

              {/* User Interface */}
              <SideBarItem
                text="User Interface "
                link="index.html"
                classname="header"
              />

              {/* Components */}
              <SideBarItem text="Components" link="components.html">
                <Grid size={26} />
              </SideBarItem>

              {/* Collections */}
              <SideBarItem text="Collections" link="collections.html">
                <Layers size={26} />
              </SideBarItem>

              <SideBarItem
                text="Login & Error "
                link="index.html"
                classname="header"
              />

              {/* Authentication */}
              <TreeSideBarItem
                HeaderText="Authentication"
                Icon={<Lock size={26} />}
              >
                <SideBarItem text="Login" link="auth_login.html">
                  <i className="ti-more" />
                </SideBarItem>

                <SideBarItem text="Login2" link="auth_login2.html">
                  <i className="ti-more" />
                </SideBarItem>

                <SideBarItem text="Register" link="auth_register.html">
                  <i className="ti-more" />
                </SideBarItem>

                <SideBarItem text="Register2" link="auth_register2.html">
                  <i className="ti-more" />
                </SideBarItem>

                <SideBarItem text="Lockscreen" link="auth_lockscreen.html">
                  <i className="ti-more" />
                </SideBarItem>

                <SideBarItem text="Recover password" link="auth_user_pass.html">
                  <i className="ti-more" />
                </SideBarItem>
              </TreeSideBarItem>
            </ul>
          </section>

          <div className="control-sidebar-bg" />
        </div>
      </aside>
    </>
  );
};
