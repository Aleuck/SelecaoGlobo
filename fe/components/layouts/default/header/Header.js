/**
 * Default layout's header component.
 * @param {Object} props - Component props.
 * @param {string} props.pageTitle - Title of the current page
 */
const Header = ({ pageTitle }) => (
  <header className="layout-default__header">
    <h1>{ pageTitle }</h1>
  </header>
);

export default Header;
