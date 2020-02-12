import React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from  '../../themes/ThemeContext';
import CloseModal from '../icons/close-modal';

/**
 * Modal Component
 * @class React.Component Modal
 * @param {Object} [props] - Component props.
 */

class Modal extends React.Component {
  static contextType = ThemeContext;
  static propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func,
  }

  render() {
    const classes = this.context.modal;
    return (
      <div className={classes.modal}>
        <button
          aria-label="fechar"
          className={classes.modal__closeButton}
          onClick={() => this.props.onClose()}
        >
          <CloseModal />
        </button>
        <div className={classes.modal__wrapper}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
