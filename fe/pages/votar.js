import '../themes/base-css';
import Layout from '../components/layouts/default'
import Buttom from '../components/button';
import ReCAPTCHA from "../components/recaptcha";

const participantes = [
  {'nome': 'Fulano de cá'},
  {'nome': 'Fulana de lá'},
];

class Votar extends React.Component {
  handleChange = value => {
    console.log("Captcha value:", value)
  }
  render() {
    return (
      <Layout pageTitle="Paredão BBB">
        <ReCAPTCHA onChange={this.handleChange} />
      </Layout>
    );
  }
}

export default Votar;
