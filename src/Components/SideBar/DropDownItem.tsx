import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

interface Props {
  icon: string;
  text: string;
  link: string;
}

const DropDownItem: React.FC<Props> = ({ icon, text, link }) => {
  return (
    <Link className="dropdown-item" key={1} to={link}>
      <i className={icon} /> {text}
    </Link>
  );
};

// Define propTypes for the component
DropDownItem.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
export default DropDownItem;
