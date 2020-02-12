import BaseIcon from '../base-icon';
import PropTypes from 'prop-types';

/**
 * Wall Icon Component
 * @class
 * @param {Object} props - Component's props.
 * @param {number} [props.size=36] - Icon's size.
 */
const Wall = ({ size }) => {
  size = size || 36;
  return (<BaseIcon iconName='wall' size={size} />);
};

Wall.propTypes = {
  size: PropTypes.number,
};

export default Wall;
