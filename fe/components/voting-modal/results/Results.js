import React, { Component, Fragment } from 'react';
import DonutChart from '../../donut-chart';
import ParticipantPicture from '../../participant-picture';
import ThemeContext from  '../../../themes/ThemeContext';

class Results extends Component {
  static contextType = ThemeContext;

  formatTime(time) {
    const rawSecs = Math.floor(time / 1000);
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
    return (
      <Fragment>
        {votedOn && (
          <p>
            <strong>Parabéns!</strong> Seu voto para <strong>{votedOn.name}</strong> foi enviado com sucesso.
          </p>
        )}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          margin: '0 -50px'
        }}>
          {participants.map(p => <ParticipantPicture participant={p} key={p.id} />)}
          <div style={{
            position: 'absolute',
            bottom: '-60px',
            width: '100%',
            left: '0',
          }}>
            {timeLeft && timeLeft > 0 ? (<p>Faltam <span>{this.formatTime(timeLeft)}</span> para encerrar a votação</p>) : null}
            <DonutChart
              radius={135}
              width={45}
              data={participants.map(p => p.votes)}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Results;
