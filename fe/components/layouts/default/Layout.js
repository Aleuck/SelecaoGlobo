import Head from 'next/head'
import Header from './header';
import Footer from './footer';
import styles from './Layout.scss';

/**
 * Default layout to render pages.
 * @param {Object} props - Component properties
 * @param {string} props.pageTitle - Title of the page being rendered with this layout
 */
const DefaultLayout = ({ pageTitle, children }) => (
  <div className={styles['layout-default']}>
    <Head>
      <title>{ pageTitle }</title>
      <meta name="description" content="Vote para o paredão do BBB." />
      <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,700&amp;display=swap" rel="stylesheet" />
    </Head>

    <Header pageTitle={ pageTitle }  className={ styles['layout-default__header'] } />

    <div className={styles['layout-default__content']}>
      { children }
    </div>

    <Footer className={styles['layout-default__footer']} />
  </div>
);

export default DefaultLayout;
