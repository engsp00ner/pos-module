import React from 'react';

interface Props {
  UserName: string;
}

export const UserInfo: React.FC<Props> = ({ UserName }) => {
  return (
    <div className="info">
      <a
        className="dropdown-toggle px-20 "
        data-toggle="dropdown"
        href="index.html#"
        aria-expanded="false"
      >
        {UserName}
      </a>
      <div
        className="dropdown-menu show"
        style={{
          willChange: 'transform',
          position: 'absolute',
          transform: 'translate3d(70px, 38px, 0px)',
          top: '0px',
          left: '0px',
        }}
      />
    </div>
  );
};
