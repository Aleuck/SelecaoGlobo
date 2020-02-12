import React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../themes/ThemeContext';
import { propType as participantPropType } from '../../models/participant';

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
    this.selectablesRefs = [];
  }

  handleSelectableChange = ({id, index}) => () => {
    if (this.state.selectedParticipant !== id) {
      this.setState({
        selectedParticipant: id,
        selectedParticipantIndex: index,
      });
      this.props.onChange(id);
    }
  }

  handleKeyDown = event => {
    const keyActions = {
      ArrowUp: this.selectPrevious,
      ArrowLeft: this.selectPrevious,
      ArrowDown: this.selectNext,
      ArrowRight: this.selectNext,
    };
    const action = keyActions[event.key];
    if (typeof action === 'function') {
      action();
      event.preventDefault();
    }
  };

  selectNext = () => {
    const { participants } = this.props;
    const currentIndex = this.state.selectedParticipantIndex || 0;
    let next = currentIndex + 1;

    if (next >= participants.length) {
      next = 0;
    }

    this.selectablesRefs[next].focus();
    this.setState({
      selectedParticipant: participants[next].id,
      selectedParticipantIndex: next,
    });
  };

  selectPrevious = () => {
    const { participants } = this.props;
    const currentIndex = this.state.selectedParticipantIndex || 0;
    let previous = currentIndex - 1;

    if (previous < 0) {
      previous = participants.length - 1;
    }

    this.selectablesRefs[previous].focus();
    this.setState({
      selectedParticipant: participants[previous].id,
      selectedParticipantIndex: previous,
    });
  };

  render() {
    const {
      participants,
    } = this.props;
    const classes = this.context.participantsSelect;
    return (
      <div className={classes['participants-select']}>
        {participants.map((participant, index) => (
          <SelectableParticipant
            key={participant.id}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleSelectableChange({
              id: participant.id,
              index
            })}
            selected={index === this.state.selectedParticipantIndex}
            tabIndex={index === (this.state.selectedParticipantIndex || 0) ? 0 : -1}
            participant={participant}
            ref={selectable => {
              this.selectablesRefs[index] = selectable;
            }}
          />
        ))}
      </div>
    );
  }
}

export default ParticipantsSelect;
