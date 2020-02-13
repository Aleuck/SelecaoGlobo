import React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from  '../../themes/ThemeContext';
import CloseModal from '../icons/close-modal';
import classNames from 'classnames';
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
    open: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClose = () => {
    this.setState({
      // flag stating as closing so it fades out
      // with css animation
      closing: true,
    });
    setTimeout(() => {
      this.setState({
        closing: false,
      });
      if (typeof this.props.onClose === 'function') {
        this.props.onClose();
      }
    }, 300);
  }

  handleHolderClick = (event) => {
    if (event.target.classList.contains(this.context.modal.modal__holder)) {
      this.handleClose();
    }
  }

  render() {
    const classes = this.context.modal;
    return (
      <div
        onClick={this.handleHolderClick}
        className={classNames(
          classes.modal__holder,
          { [classes.modal__holder_open]: this.props.open },
          { [classes.modal__holder_close]: this.state.closing },
        )}
      >
        <div className={classes.modal}>
          <button
            aria-label="fechar"
            className={classes.modal__closeButton}
            onClick={this.handleClose}
          >
            <CloseModal />
          </button>
          <div className={classes.modal__wrapper}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
