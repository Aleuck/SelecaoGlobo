import React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from  '../../themes/ThemeContext';

/**
 * Modal Component
 * @class React.Component Modal
 * @param {Object} [props] - Component props.
 */

class Modal extends React.Component {
  static contextType = ThemeContext;
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const classes = this.context.modal
    return (
      <div className={classes.modal}>
        <div className={classes.modal__wrapper}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
