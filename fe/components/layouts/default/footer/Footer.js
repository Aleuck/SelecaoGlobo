import { Component } from 'react';
import ThemeContext from '../../../../themes/ThemeContext';

/**
 * Default layout's footer component.
 */
class Footer extends Component {
  static contextType = ThemeContext;
  render() {
    const classes = this.context.layout;
    return (
      <footer className={classes.page__footer}>
        <p><small>A. Leuck - Seleção para Desenvolvedor(a) Front-end - globo.com</small></p>
      </footer>
    );
  }
}

Footer.context;

export default Footer;
