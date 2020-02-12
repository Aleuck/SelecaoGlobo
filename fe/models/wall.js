import PropTypes from 'prop-types';
import { propType as participantPropType } from './participant';

/** Wall propTypes model */
const propType = PropTypes.shape({
  startsAt: PropTypes.string,
  endsAt: PropTypes.string,
  participants: PropTypes.arrayOf(participantPropType),
});

export { propType };
