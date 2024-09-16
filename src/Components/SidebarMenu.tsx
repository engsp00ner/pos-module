import React from 'react';

interface SidebarMenuProps {
  menuItems: MenuItem[];
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ menuItems }) => {
  const renderMenuItem = (item: MenuItem) => {
    if (item.submenu) {
      return (
        <li className="treeview">
          <a href={item.link || '#'}>
            {item.icon && <i data-feather={item.icon} />}
            <span>{item.name}</span>
            <span className="pull-right-container">
              <i className="fa fa-angle-right pull-right" />
            </span>
          </a>
          <ul className="treeview-menu">
            {item.submenu.map((subItem) => renderMenuItem(subItem))}
          </ul>
        </li>
      );
    }
    return (
      <li>
        <a href={item.link || '#'}>
          {item.icon && <i data-feather={item.icon} />}
          <span>{item.name}</span>
        </a>
      </li>
    );
  };

  return (
    <ul className="sidebar-menu" data-widget="tree">
      {menuItems.map((item, key) => {
        if (!item.link) {
          // Assuming headers don't have links
          return (
            <li className="header" key={key}>
              {item.name}
            </li>
          );
        }
        return renderMenuItem(item);
      })}
    </ul>
  );
};
export interface MenuItem {
  name: string;
  icon?: string;
  link?: string;
  submenu?: MenuItem[];
}
export default SidebarMenu;
