import Head from 'next/head';
import Header from './header';
import Footer from './footer';
import PropTypes from 'prop-types';
import { Component } from 'react';
import ThemeContext from '../../../themes/ThemeContext';

/**
 * Default layout to render pages.
 * @param {Object} props - Component properties
 * @param {string} props.pageTitle - Title of the page being rendered with this layout
 */
class DefaultLayout extends Component {
  static contextType = ThemeContext;
  render() {
    return (
      <div className={this.context.page}>
        <Head>
          <title>{this.props.pageTitle}</title>
          <meta name="description" content="Vote para o paredão do BBB." />
          <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,700&amp;display=swap" rel="stylesheet" />
        </Head>

        <Header pageTitle={this.props.pageTitle} />

        <div className={this.context.page__content}>
          {this.props.children}
        </div>

        <Footer />
      </div>
    );
  }
}

DefaultLayout.propTypes = {
  pageTitle: PropTypes.string,
  children: PropTypes.node,
};

export default DefaultLayout;
