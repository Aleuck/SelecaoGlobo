import BaseIcon from '../base-icon';

/**
 * CloseModal Icon Component
 * @class
 * @param {Object} props - Component's props.
 * @param {number} [props.size=39] - Icon's size.
 */
const CloseModal = ({ size }) => {
  size = size || 39;
  return (<BaseIcon iconName='close-modal' size={size} />);
}

export default CloseModal;
