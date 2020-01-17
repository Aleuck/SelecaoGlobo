import PropTypes from 'prop-types';
import ThemeContext from '../../themes/ThemeContext';
import React from 'react';

/**
 * @event clickEvent
 * @param {React.MouseEvent} event
 */

/**
 * Button component
 * @param {clickEvent} onClick
 * @listens clickEvent
 */
class Button extends React.Component {
  static contextType = ThemeContext;
  static propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
  };
  render() {
    return (
      <button onClick={this.props.onClick} className={this.context.button}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
