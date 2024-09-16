import React from 'react';
import { Bell, LogOut, MessageCircle, Search } from 'react-feather';
import InLineListElement from './InLineListElement';

const InLineList: React.FC = () => {
  return (
    <ul className="list-inline profile-setting mt-10 mb-0 d-flex justify-content-between">
      <InLineListElement
        link="index2.html#"
        Toggle="tooltip"
        Placement="top"
        Title="Search"
      >
        <Search />
      </InLineListElement>

      <InLineListElement
        link="index2.html#"
        Toggle="tooltip"
        Placement="top"
        Title="Notification"
      >
        <Bell />
      </InLineListElement>
      <InLineListElement link="index2.html#" Toggle="tooltip" Placement="top">
        <MessageCircle />
      </InLineListElement>
      <InLineListElement link="index2.html#" Toggle="tooltip" Placement="top">
        <LogOut />
      </InLineListElement>
    </ul>
  );
};

export default InLineList;
