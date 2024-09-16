import React, { useEffect, useRef, useState } from 'react';

interface Props {
  HeaderText: string;
  children?: React.ReactNode;
  Icon?: React.ReactNode;
}

export const TreeSideBarItem: React.FC<Props> = ({
  HeaderText,
  children,
  Icon,
}) => {
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

  const HandleOnClick = () => {
    SetActive(!Active);
  };

  const HandleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      HandleOnClick();
    }
  };

  return (
    <li
      className={`treeview ${Active ? 'menu-open' : ''}`}
      onClick={HandleOnClick}
      onKeyDown={HandleKeyDown} // Add keydown handler
      role="button" // Add role to make it behave like a button
      tabIndex={0} // Make it focusable
    >
      <a href="index.html#">
        {Icon}
        <span>{HeaderText}</span>
        <span className="pull-right-container">
          <i className="fa fa-angle-right pull-right" />
        </span>
      </a>
      {Active && (
        <ul className="treeview-menu" style={{ display: 'block' }}>
          {children}
        </ul>
      )}
    </li>
  );
};
