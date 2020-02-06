import '../themes/base-css';
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import fetch from 'isomorphic-fetch';

import Layout from '../components/layouts/default';
import Modal from '../components/modal';
import ModalHeader from '../components/modal-header';
import ModalFooter from '../components/modal-footer';
import Button from '../components/button';
import { WallIcon } from '../components/icons'
import ParticipantsSelect from '../components/participants-select';

const recaptchaRef = React.createRef();

class Votar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      state: 'loading',
    };
  }
  componentDidMount() {
    fetch(`${process.env.SERVER_URL}/current-wall`)
      .then(response => response.json())
      .then(([wallData]) => {
        if (wallData) {
          this.setState({
            participants: wallData.participants.map(
              ({ name, image, walls_participants }) => ({
                id: walls_participants.id,
                name,
                image,
                callNumber: walls_participants.callNumber,
                smsNumber: walls_participants.smsNumber,
              })
            ),
            state: 'loaded',
          });
        } else {
          this.setState({
            state: 'no-wall',
          });
        }
      });
  }
  handleRecaptchaChange = value => {
    console.log('Captcha value:', value);
    this.setState({
      captchaValue: value,
    });
    if (value) {
      this.sendVote();
    }
  }
  handleRecaptchaExpired = () => {
    this.setState({
      captchaValue: null,
    });
  };
  handleButtonClick = () => {
    if (this.state.captchaValue) {
      this.sendVote();
    } else {
      recaptchaRef.current.execute();
    }
  }
  handleSelectChange = participantId => {
    this.setState({
      selectedParticipant: participantId,
    });
  }
  sendVote = () => {
    const {
      selectedParticipant,
      captchaValue,
    } = this.state;
    fetch(`${process.env.SERVER_URL}/current-wall`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vote: selectedParticipant,
        captcha: captchaValue,
      }),
    })
      .then(response => {
        console.dir(response);
      })
  };
  render() {
    const { participants, state } = this.state;
    return (
      <Layout pageTitle="">
        {
        state === 'loading' ? (
            <Modal>
              <h2>Carregando</h2>
            </Modal>
        ) :
        state === 'loaded' ? (
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
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.RECAPTCHA_KEY}
              size="invisible"
              hr="pt-BR"
              onChange={this.handleRecaptchaChange}
            />
          </Modal>
        ) :
        (
          <Modal>
            <p>Não há nenhum paredão em andamento.</p>
          </Modal>
        )
        }

      </Layout>
    );
  }
}

export default Votar;
