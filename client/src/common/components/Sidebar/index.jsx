import PropTypes from 'prop-types';
import { Drawer } from 'react-daisyui';

function Sidebar({ children, ...props }) {
  return <Drawer {...props}>{children}</Drawer>;
}

Sidebar.propTypes = {
  children: PropTypes.node,
};

export default Sidebar;
