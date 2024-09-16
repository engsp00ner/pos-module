import { Link } from 'react-router-dom';

export const Logo: React.FC = () => {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link to="#" className="logo">
      <div className="logo-lg">
        <span className="light-logo">
          <img src="./assets/images/logo.png" alt="Not found" />
        </span>
        <span className="dark-logo">
          <img src="./assets/images/logo.png" alt="Not found" />
        </span>
      </div>
    </Link>
  );
};
