import React from 'react';
import Modal from '../modal';
import ModalHeader from '../modal-header';
import { WallIcon } from '../icons';
import ReCAPTCHA from 'react-google-recaptcha';
import PropTypes from 'prop-types';
import Voting from './voting';
import Results from './results';
import fetch from 'isomorphic-fetch';
import { propType as wallPropType } from '../../models/wall';

const recaptchaRef = React.createRef();

class VotingModal extends React.Component {
  static propTypes = {
    wall: wallPropType,
    onClose: PropTypes.func,
    onRequestWallUpdate: PropTypes.func,
    open: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.tick();
    this.tickIntervalHandler = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.tickIntervalHandler);
  }

  tick = () => {
    const timeLeft = Math.floor((new Date(this.props.wall.endsAt) - Date.now()) / 1000);
    const canVote = timeLeft > 0;

    this.setState({
      timeLeft,
      canVote,
    });

    // update results every 11 seconds
    if (timeLeft % 11 === 0) {
      if (canVote && this.state.votedOnId) {
        if (typeof this.props.onRequestWallUpdate === 'function') {
          this.props.onRequestWallUpdate();
        }
      }
    }
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

    recaptchaRef.current.reset();

    this.setState({
      captchaValue: null,
    });

    return fetch(`${process.env.API_URL}/current-wall`, {
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
        if (response.status === 201) {
          this.setState({
            votedOnId: selectedParticipant,
          });
          if (typeof this.props.onRequestWallUpdate === 'function') {
            this.props.onRequestWallUpdate();
          }
        }
      });
  };

  handleModalClose = () => {
    this.setState({
      votedOnId: null,
    });
    if (typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
  }

  render() {
    const { participants } = this.props.wall;
    const showVoting = this.state.canVote && !this.state.votedOnId;
    return (
      <Modal open={this.props.open} onClose={this.handleModalClose}>
        <ModalHeader
          icon={<WallIcon />}
          title={<h2>Quem deve ser <strong>eliminado</strong>?</h2>}
        />
        {this.state.votedOnId || !this.state.canVote ? (
          <Results
            votedOn={participants.find(p => p.id === this.state.votedOnId)}
            participants={participants}
            timeLeft={this.state.timeLeft}
          />
        ) : (
          <Voting
            onSubmit={this.handleButtonClick}
            onChange={this.handleSelectChange}
            selectedParticipant={this.state.selectedParticipant}
            participants={participants}
          />
        )}
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.RECAPTCHA_KEY}
          size="invisible"
          hr="pt-BR"
          onChange={this.handleRecaptchaChange}
        />
      </Modal>
    );
  }
}

export default VotingModal;
