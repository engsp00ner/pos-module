/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import DropDownItem from './DropDownItem';
import '../../CustomStyle/DropDownMenuStyle.css';

interface Props {
  UserName: string;
}
export const DropDownList: React.FC<Props> = ({ UserName }) => {
  const [Active, SetActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        SetActive(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [Active]);
  function HandleOnClick() {
    SetActive(!Active);
  }
  return (
    <div className={`info ${Active ? 'show' : ''}`} ref={menuRef}>
      <Link
        to="#"
        className="dropdown-toggle px-20"
        onClick={HandleOnClick}
        aria-expanded={Active}
      >
        {UserName}
      </Link>
      <div
        className={`dropdown-menu ${Active ? ' show' : ''}`}
        style={{
          willChange: 'transform',
          position: 'absolute',
          transform: 'translate3d(80px , 108px , 0px)',
          top: '0px',
          left: '0px',
        }}
      >
        <DropDownItem icon="ti-user" text="Profile" link="#" />
        <DropDownItem icon="ti-email" text="Inbox" link="#" />
        <DropDownItem icon="ti-link" text="Connections" link="#" />
        <div className="dropdown-divider" />
        <DropDownItem icon="ti-settings" text="Settings" link="#" />
      </div>
    </div>
  );
};
