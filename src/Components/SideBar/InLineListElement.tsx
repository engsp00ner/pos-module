import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  link: string;
  Toggle: string;
  Placement: string;
  Title?: string;
  children?: React.ReactNode;
}

const InLineListElement: React.FC<Props> = ({
  link,
  Toggle,
  Placement,
  Title = '',
  children = <></>,
}) => {
  return (
    <li>
      <Link
        to={link}
        data-toggle={Toggle}
        data-placement={Placement}
        title={Title}
      >
        {children}
      </Link>
    </li>
  );
};

export default InLineListElement;
