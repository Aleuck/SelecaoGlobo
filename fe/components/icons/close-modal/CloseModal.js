import BaseIcon from '../base-icon';
import PropTypes from 'prop-types';
/**
 * CloseModal Icon Component
 * @class
 * @param {Object} props - Component's props.
 * @param {number} [props.size=39] - Icon's size.
 */
const CloseModal = ({ size }) => {
  size = size || 39;
  return (<BaseIcon iconName='close-modal' size={size} />);
};

CloseModal.propTypes = {
  size: PropTypes.number,
};

export default CloseModal;
