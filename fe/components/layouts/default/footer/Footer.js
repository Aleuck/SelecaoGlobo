import PropTypes from 'prop-types';

/**
 * Default layout's footer component.
 */
const Footer = ({ className }) => (
  <footer className={ className }>
    <p>footer</p>
  </footer>
);

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
