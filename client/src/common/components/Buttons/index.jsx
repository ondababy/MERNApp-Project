import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

function Button({ children, ...buttonProps }) {
  return (
    <button
      className="btn btn-primary"
      {...buttonProps}
    >
      {children}
    </button>
  );
}

Button.propTypes = propTypes;

export default Button;
export { default as ActionButtons } from './ActionButtons';
export { default as BackButton } from './BackButton';
export { default as DeleteButton } from './DeleteButton';
export { default as EditButton } from './EditButton';
export { default as LinkButton } from './LinkButton';
export { default as ViewButton } from './ViewButton';
