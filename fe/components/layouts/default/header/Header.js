import PropTypes from 'prop-types';
import { Component } from 'react';
import ThemeContext from '../../../../themes/ThemeContext';

/**
 * Default layout's header component.
 * @param {Object} props - Component props.
 * @param {string} props.pageTitle - Title of the current page
 */
class Header extends Component {
  static contextType = ThemeContext;
  render() {
    const classes = this.context.layout;
    return (
      <header className={classes.page__header}>
        <h1>{ this.props.pageTitle }</h1>
      </header>
    );
  }
}
Header.propTypes = {
  pageTitle: PropTypes.string,
};

export default Header;
