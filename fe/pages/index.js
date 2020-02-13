import '../themes/base-css';
import React, { Fragment } from 'react';
import fetch from 'isomorphic-fetch';

import Layout from '../components/layouts/default';
import VotingModal from '../components/voting-modal';
import Button from '../components/button';
import ParticipantPicture from '../components/participant-picture';

class Votar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wall: null,
      state: 'loading',
      showModal: false,
    };
  }

  componentDidMount() {
    this.fetchWallData();
  }

  handleModalClose = () => {
    this.setState({
      showModal: false,
    });
  }

  handleModalOpen = () => {
    this.setState({
      showModal: true,
    });
  }

  fetchWallData = () => {
    return fetch(`${process.env.SERVER_URL}/current-wall`)
      .then(response => response.json())
      .then(([wallData]) => {
        if (wallData) {
          console.log('wallData', wallData);
          this.setState({
            wall: wallData,
            state: 'loaded',
          });
        } else {
          this.setState({
            wall: null,
            state: 'no-wall',
          });
        }
      });
  }

  render() {
    const {
      wall,
      state,
      showModal,
    } = this.state;
    return (
      <Layout
        pageTitle="Paredão do BBB"
        header={(<h1>Paredão do BBB</h1>)}
      >
        {
          state === 'loading' ? (
            <p>Carregando...</p>
          ) :
            state === 'loaded' ? (
              <Fragment>
                <p>Bem vindo(a) ao paredão do BBB</p>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    justifyContent: 'space-around',
                    maxWidth: '800px',
                    margin: '-30px auto 10px',
                    width: '100%',
                  }}
                >
                  {
                    wall.participants.map(p => (
                      <ParticipantPicture
                        participant={p}
                        key={p.id}
                        style={{
                          borderRadius: '5px',
                          margin: '5px',
                          flexShrink: 1,
                          maxWidth: '50%',
                          objectFit: 'cover',
                        }}
                      />
                    ))
                  }
                </div>
                <Button onClick={this.handleModalOpen}>
                  {
                    new Date(wall.endsAt) > Date.now() ?
                      ('Votar agora') :
                      ('Conferir os resultados')
                  }
                </Button>
                <VotingModal
                  wall={wall}
                  open={showModal}
                  onClose={this.handleModalClose}
                  onRequestWallUpdate={this.fetchWallData}
                />
              </Fragment>
            ) :
              (
                <p>Não há nenhum paredão em andamento.</p>
              )
        }
      </Layout>
    );
  }
}

export default Votar;
