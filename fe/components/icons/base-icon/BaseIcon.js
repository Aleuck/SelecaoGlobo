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
  static sizes = [36, 39];
  render() {
    const { size, iconName } = this.props;
    const classes = this.context.icons;
    return (
      <span
        className={classNames(
          classes.icon,
          { [classes[`icon-${iconName}`]]: Boolean(iconName) },
          { [classes[`icon-${size}`]]: BaseIcon.sizes.includes(size) },
        )}
      />
    );
  }
}

export default BaseIcon;
