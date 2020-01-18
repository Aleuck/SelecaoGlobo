import React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../../themes/ThemeContext';
import classNames from 'classnames';

/**
 * BaseIcon Component
 * @class
 * @param {Object} props - Component's props.
 * @param {string} props.iconName - Name of the icon.
 * @param {number} props.size - Icon's size.
 */
class BaseIcon extends React.Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    iconName: PropTypes.string.isRequired,
  };
  static contextType = ThemeContext;
  static sizes = [36];
  render() {
    const { size, iconName } = this.props;
    return (
      <span
        className={classNames(
          this.context.icon,
          { [this.context[`icon-${iconName}`]]: Boolean(iconName) },
          { [this.context[`icon-${size}`]]: BaseIcon.sizes.includes(size) },
        )}
      />
    );
  }
}

export default BaseIcon;
