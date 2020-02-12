import React, { Fragment } from 'react';
import ModalFooter from '../../modal-footer';
import ParticipantsSelect from '../../participants-select';
import Button from '../../button';
import PropTypes from 'prop-types';
import { propType as participantPropType } from '../../../models/participant';

class Voting extends React.Component {
  static propTypes = {
    participants: PropTypes.arrayOf(participantPropType).isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    selectedParticipant: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { participants, onChange, onSubmit, selectedParticipant } = this.props;
    return (
      <Fragment>
        <ParticipantsSelect participants={participants} onChange={onChange} />
        <ModalFooter>
          <Button
            onClick={onSubmit}
            disabled={!selectedParticipant}
          >
            Envie seu voto agora
          </Button>
        </ModalFooter>
      </Fragment>
    );
  }
}

export default Voting;
