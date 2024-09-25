import React from 'react';
interface SidebarMenuProps {
    menuItems: MenuItem[];
}
declare const SidebarMenu: React.FC<SidebarMenuProps>;
export interface MenuItem {
    name: string;
    icon?: string;
    link?: string;
    submenu?: MenuItem[];
}
export default SidebarMenu;
