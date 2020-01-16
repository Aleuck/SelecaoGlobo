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

export default Header;
