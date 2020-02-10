import React from 'react';
import { propType as participantPropType } from '../../models/participant';

import fetch from 'isomorphic-fetch';

class ParticipantPicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {
    participant: participantPropType,
  };
  componentDidMount() {
    this.loadImage();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.participant.image !== this.props.participant.image) {
      this.loadImage();
    }
  }

  loadImage() {
    const { participant } = this.props;
    if (participant.image) {
      fetch(`${process.env.SERVER_URL}/images/${participant.image}`)
        .then(respone => respone.json())
        .then(imageData => {
          this.setState({
            imageUri: imageData.uri,
          });
        })
    }
  }

  render() {
    const {
      participant,
      ...other
    } = this.props;
    return (
      <img
        alt={participant.name}
        src={this.state.imageUri}
        {...other}
      />
    );
  }
};

export default ParticipantPicture;
