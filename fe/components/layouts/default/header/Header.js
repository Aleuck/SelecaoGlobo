import PropTypes from 'prop-types';
import { Component } from 'react';
import ThemeContext from '../../../../themes/ThemeContext';

/**
 * Default layout's header component.
 * @param {Object} props - Component props.
 * @param {node} props.children - Header content
 */
class Header extends Component {
  static contextType = ThemeContext;
  render() {
    const classes = this.context.layout;
    return (
      <header className={classes.page__header}>
        {this.props.children}
      </header>
    );
  }
}
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
