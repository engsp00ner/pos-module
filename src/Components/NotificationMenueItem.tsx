import React from 'react';

interface Props {
  Link: string;
  TextStyle: string;
  Text: string;
  children?: React.ReactNode;
}

export const NotificationMenueitem: React.FC<Props> = ({
  Link,
  children,
  TextStyle,
  Text,
}) => {
  return (
    <li>
      <a href={Link} className={` ${TextStyle} `}>
        {children}
        {Text}
      </a>
    </li>
  );
};
