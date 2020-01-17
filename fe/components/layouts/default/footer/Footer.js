import { Component } from 'react';
import ThemeContext from '../../../../themes/ThemeContext';

/**
 * Default layout's footer component.
 */
class Footer extends Component {
  static contextType = ThemeContext;
  render() {
    return (
      <footer className={this.context.page__footer}>
        <p>footer</p>
      </footer>
    );
  }
}

Footer.context;

export default Footer;
