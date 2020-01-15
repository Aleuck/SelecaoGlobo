import Head from 'next/head'
import Header from './header';
import Footer from './footer';
import './Layout.scss';

const DefaultLayout = ({ pageTitle, children }) => (
  <div className="site layout-default">
    <Head>
      <title>{ pageTitle }</title>
      <meta name="description" content="Vote no paredão do bbb" />
      <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,700&amp;display=swap" rel="stylesheet" />
    </Head>
    <Header pageTitle={ pageTitle } />
    <div className="layout-default__content">
      { children }
    </div>
    <Footer />
  </div>
);

export default DefaultLayout;
