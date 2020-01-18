import PropTypes from 'prop-types';
import ThemeContext from '../../themes/ThemeContext';
import React from 'react';

/**
 * @event clickEvent
 * @param {React.MouseEvent} event
 */


class Button extends React.Component {
  /**
   * Button component
   * @constructs Button
   * @param {Object} props - Component props
   * @param {clickEvent} props.onClick - On click handler.
   * @listens clickEvent
   */
  constructor(props) {
    super(props);
  }
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
