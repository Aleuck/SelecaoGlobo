import PropTypes from 'prop-types';

/**
 * Default layout's header component.
 * @param {Object} props - Component props.
 * @param {string} props.pageTitle - Title of the current page
 * @param {string} props.className - Header class.
 */
const Header = ({ className, pageTitle }) => (
  <header className={ className }>
    <h1>{ pageTitle }</h1>
  </header>
);

Header.propTypes = {
  pageTitle: PropTypes.string,
  className: PropTypes.string,
};

export default Header;
