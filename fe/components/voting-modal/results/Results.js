import React, { Component } from 'react';
import DonutChart from '../../donut-chart';
import ParticipantPicture from '../../participant-picture';
import ThemeContext from  '../../../themes/ThemeContext';
import PropTypes from 'prop-types';
import { propType as participantPropType } from '../../../models/participant';

class Results extends Component {
  static contextType = ThemeContext;
  static propTypes = {
    participants: PropTypes.arrayOf(participantPropType),
    votedOn: participantPropType,
    timeLeft: PropTypes.number,
  };

  formatTime(time) {
    const rawSecs = time;
    const rawMins = Math.floor(rawSecs / 60);
    const rawHours = Math.floor(rawMins / 60);
    const secs = (rawSecs - rawMins * 60).toString(10).padStart(2, '0');
    const mins = (rawMins - rawHours * 60).toString(10).padStart(2, '0');
    const hours = rawHours.toString(10).padStart(2, '0');
    return `${hours}:${mins}:${secs}`;
  }
  render() {
    const { participants, votedOn, timeLeft } = this.props;
    const classes = this.context.votingModal;
    const wallEnded = !timeLeft || timeLeft <= 0;
    return (
      <div className={classes.results}>
        {votedOn && (
          <p>
            <strong>Parabéns!</strong> Seu voto para <strong>{votedOn.name}</strong> foi enviado com sucesso.
          </p>
        )}
        {wallEnded ? (
          <p>
            <strong>A votação está encerrada.</strong>
          </p>
        ) : null }
        <div className={classes.resultsInfo}>
          {participants.map(p => <ParticipantPicture participant={p} key={p.id} />)}
          <div className={classes.donutChart}>
            {!wallEnded > 0 ? (
              <div className={classes.timeLeft}>
                <p>Faltam <span>{this.formatTime(timeLeft)}</span> para encerrar a votação</p>
              </div>
            ) : null}
            <DonutChart
              radius={135}
              width={45}
              data={participants.map(p => p.votes)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
