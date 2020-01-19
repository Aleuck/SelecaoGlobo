import '../themes/base-css';
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import fetch from 'isomorphic-fetch';

import Layout from '../components/layouts/default';
import Button from '../components/button';
import Modal from '../components/modal';
import ModalHeader from '../components/modal-header';
import ModalFooter from '../components/modal-footer';
import { WallIcon } from '../components/icons'
import ParticipantsSelect from '../components/participants-select';

const participants = [
  {
    'id': 'participante_1',
    'name': 'Participante 1',
    'image': '/participante1.png',
    'callNumber': '0800-123-001',
    'smsNumber': '8001',
  },
  {
    'id': 'participante_2',
    'name': 'Participante 2',
    'image': '/participante2.png',
    'callNumber': '0800-123-002',
    'smsNumber': '8002',
  },
];

const recaptchaRef = React.createRef();

class Votar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleRecaptchaChange = value => {
    console.log('Captcha value:', value);
  }
  handleRecaptchaExpired = () => {};
  handleButtonClick = () => {
    recaptchaRef.current.execute();
  }
  handleSelectChange = participantId => {
    this.setState({
      selectedParticipant: participantId,
    });
  }
  render() {
    return (
      <Layout pageTitle="">
        <Modal>
          <ModalHeader
            icon={<WallIcon />}
            title={<h2>Quem deve ser <strong>eliminado</strong>?</h2>}
          />
          <ParticipantsSelect participants={participants} onChange={this.handleSelectChange} />
          <ModalFooter>
            <Button
              onClick={this.handleButtonClick}
              disabled={! this.state.selectedParticipant}
            >
              Envie seu voto agora
            </Button>
          </ModalFooter>
        </Modal>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.RECAPTCHA_KEY}
          size="invisible"
          hr="pt-BR"
          onChange={this.handleRecaptchaChange}
        />
      </Layout>
    );
  }
}

export default Votar;
