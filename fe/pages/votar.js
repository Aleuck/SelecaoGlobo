import '../themes/base-css';
import Layout from '../components/layouts/default';
import Button from '../components/button';
import ReCAPTCHA from 'react-google-recaptcha';

const participantes = [
  {'nome': 'Fulano de cá'},
  {'nome': 'Fulana de lá'},
];

const recaptchaRef = React.createRef();

class Votar extends React.Component {
  handleRecaptchaChange = value => {
    console.log('Captcha value:', value);
  }
  handleRecaptchaExpired = () => {};
  handleButtonClick = () => {
    recaptchaRef.current.execute();
  }
  render() {
    return (
      <Layout pageTitle="Paredão BBB">
        <Button onClick={this.handleButtonClick}>Votar</Button>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6Lc1bdAUAAAAAJpZDL22jcVtljRchWWanaYPVqfi"
          size="invisible"
          hr="pt-BR"
          onChange={this.handleRecaptchaChange}
        />
      </Layout>
    );
  }
}

export default Votar;
