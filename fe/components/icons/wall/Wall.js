import BaseIcon from '../base-icon';

/**
 * Wall Icon Component
 * @class
 * @param {Object} props - Component's props.
 * @param {number} [props.size=36] - Icon's size.
 */
const Wall = ({ size }) => {
  size = size || 36;
  return (<BaseIcon iconName='wall' size={size} />);
}

export default Wall;
