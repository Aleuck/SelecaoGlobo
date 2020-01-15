import Head from 'next/head'
import Header from '../../header';
import Footer from '../../footer';

const DefaultLayout = props => (
  <div>
    <Head>
      <title>{props.pageTitle}</title>
    </Head>
    <Header />
    { props.children }
    <Footer />
  </div>
);

export default DefaultLayout;
