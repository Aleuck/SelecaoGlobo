import PropTypes from 'prop-types';

/** Participant propTypes model */
const propType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  callNumber: PropTypes.string,
  smsNumber: PropTypes.string,
  votes: PropTypes.number,
});

export { propType };
