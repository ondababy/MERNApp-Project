import PropTypes from 'prop-types';
import React from 'react';

function ConfigmDialogue({ children, title, onClose }) {
  return <div></div>;
}

ConfigmDialogue.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export default ConfigmDialogue;

