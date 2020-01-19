import React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../themes/ThemeContext';
import { propType as participantPropType } from '../../models/participant'

import SelectableParticipant from '../selectabe-participant';

/**
 * ParticipantsSelect component.
 */
class ParticipantsSelect extends React.Component {
  static contextType = ThemeContext;
  static propTypes = {
    participants: PropTypes.arrayOf(participantPropType),
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSelectableChange = participantId => () => {
    if (this.state.selectedParticipant !== participantId) {
      this.setState({
        selectedParticipant: participantId,
      });
      this.props.onChange(participantId);
    }
  }

  render() {
    const {
      participants,
    } = this.props;
    const classes = this.context.participantsSelect
    return (
      <div className={classes['participants-select']}>
        {participants.map(participant => (
          <SelectableParticipant
            key={participant.id}
            onChange={this.handleSelectableChange(participant.id)}
            selected={participant.id === this.state.selectedParticipant}
            participant={participant}
          />
        ))}
      </div>
    );
  }
}

export default ParticipantsSelect
