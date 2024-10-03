import PropTypes from 'prop-types';
import React from 'react';

function Modal({ children, title, onClose }) {
  return <div></div>;
}

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export default Modal;

