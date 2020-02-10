import '../themes/base-css';
import React from 'react';
import fetch from 'isomorphic-fetch';

import Layout from '../components/layouts/default';
import Modal from '../components/modal';
import ModalHeader from '../components/modal-header';
import DonutChart from '../components/donut-chart';
import ParticipantPicture from '../components/participant-picture';
import { WallIcon } from '../components/icons';

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
  getData = () => {
    return fetch(`${process.env.SERVER_URL}/current-wall`)
      .then(response => {
        console.dir(response);
      });
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
                <p><strong>Parabéns!</strong> Seu voto para <strong>Participante 1</strong> foi enviado com sucesso.</p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  margin: '0 -50px'
                }}>
                  <ParticipantPicture participant={participants[0]} />
                  <ParticipantPicture participant={participants[1]} />
                  <div style={{
                    position: 'absolute',
                    bottom: '-60px',
                    width: '100%',
                    left: '0',
                  }}>
                    <DonutChart
                      radius={135}
                      width={40}
                      data={[980,1000]}
                    />
                  </div>
                </div>
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
