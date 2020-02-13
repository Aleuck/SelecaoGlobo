import React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../themes/ThemeContext';
import Selectable from '../selectable';
import { propType as participantPropType } from '../../models/participant';
import ParticipantPicture from '../participant-picture';
/** Class represents a selectable participant */
class SelectableParticipant extends React.Component {
  static contextType = ThemeContext;
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    tabIndex: PropTypes.number,
    participant: participantPropType,
    onKeyDown: PropTypes.func,
    selected: PropTypes.bool,
    onChange: PropTypes.func,
  };

  /**
   * Creates a SelectableParticipant component.
   * @param {Object} props
   * @param {string} props.id
   * @param {string} props.name
   * @param {number} props.tabIndex
   * @param {Object} props.participant
   * @param {function} props.onKeyDown
   */
  constructor(props) {
    super(props);
    this.selectableRef = React.createRef();
  }

  focus() {
    this.selectableRef.current.focus();
  }

  render() {
    const {
      participant,
      selected,
      onChange,
      onKeyDown,
      tabIndex,
    } = this.props;
    const classes = this.context.selectableParticipant;

    return (
      <div className={classes.participant}>
        <h4 className={classes.participant__name}>{participant.name}</h4>
        <Selectable
          id={participant.id}
          name="participant"
          selected={selected}
          onChange={onChange}
          onKeyDown={onKeyDown}
          ariaLabel={participant.name}
          tabIndex={tabIndex || 0}
          role="radio"
          ref={this.selectableRef}
        >
          <ParticipantPicture
            participant={participant}
            className={classes.participant__img}
          />
        </Selectable>
        <p className={classes.participant__text}>
          Para eliminar o <strong>{participant.name}</strong> pelo telefone<br />
          disque <strong>{participant.callNumber}</strong> ou mande um SMS para <strong>{participant.smsNumber}</strong>
        </p>
      </div>
    );
  }
}

export default SelectableParticipant;
