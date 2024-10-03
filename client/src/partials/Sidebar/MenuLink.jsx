import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const MenuLink = ({ icon, label, addClass, ...props }) => {
  return (
    <Link
      {...props}
      className={
        'flex items-center gap-2 font-bold transition-transform ease-in-out hover:text-primary hover:text-lg hover:z-10 ' +
        addClass
      }
    >
      {icon}
      {label}
    </Link>
  );
};

MenuLink.propTypes = {
  icon: PropTypes.node,
  addClass: PropTypes.string,
  label: PropTypes.string,
};

export default MenuLink;
