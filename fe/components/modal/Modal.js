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
    return (
      <div className={this.context.modal}>
        <div className={this.context.modal__wrapper}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
