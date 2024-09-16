import { Link } from 'react-router-dom';

interface Props {
  text: string;
  children?: React.ReactNode;
  classname?: string;
  link: string;
}

export const SideBarItem: React.FC<Props> = ({
  text,
  children,
  classname,
  link,
}) => {
  return (
    <li className={classname}>
      <Link to={link}>
        {children}
        <span>{text}</span>
      </Link>
    </li>
  );
};
