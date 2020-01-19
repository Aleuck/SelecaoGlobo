import React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../themes/ThemeContext';
import Selectable from '../selectable';
/**
 * SelectableParticipant Component
 * @class
 * @param {Object} props
 * @param {Object} props
 */
class SelectableParticipant extends React.Component {
  static contextType = ThemeContext;
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  };

  render() {
    const {
      participant,
      selected,
      onChange,
    } = this.props;

    return (
      <div className={this.context.participant}>
        <h4 className={this.context.participant__name}>{participant.name}</h4>
        <Selectable
          id={participant.id}
          name="participant"
          selected={selected}
          onChange={onChange}
          role="radio"
        >
          <img
            className={this.context.participant__img}
            src={participant.image}
            alt={participant.name}
          />
        </Selectable>
        <p className={this.context.participant__text}>
          Para eliminar o <strong>{participant.name}</strong> pelo telefone<br />
          disque <strong>{participant.callNumber}</strong> ou mande um SMS para <strong>{participant.smsNumber}</strong>
        </p>
      </div>
    );
  }
}

export default SelectableParticipant;
