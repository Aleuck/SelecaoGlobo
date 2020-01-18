import React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../themes/ThemeContext';

/**
 * @event clickEvent
 * @param {React.MouseEvent} event
 */


class Button extends React.Component {
  /**
   * Button component
   * @constructs Button
   * @param {Object} [props] - Component props
   * @param {boolean} [props.disabled=false] - On click handler.
   * @param {clickEvent} [props.onClick] - On click handler.
   * @listens clickEvent
   */
  constructor(props) {
    super(props);
  }
  static contextType = ThemeContext;
  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
  };
  render() {
    const { disabled, onClick } = this.props;
    return (
      <button disabled={disabled} onClick={onClick} className={this.context.button}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
