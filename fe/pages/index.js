import '../themes/base-css';
import React from 'react';
import fetch from 'isomorphic-fetch';

import Layout from '../components/layouts/default';
import Modal from '../components/modal';
import VotingModal from '../components/voting-modal';

class Votar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wall: null,
      state: 'loading',
    };
  }

  componentDidMount() {
    this.fetchWallData();
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
    const { wall, state } = this.state;
    return (
      <Layout pageTitle="">
        {
          state === 'loading' ? (
            <Modal>
              <h2>Carregando</h2>
            </Modal>
          ) :
            state === 'loaded' ? (
              <VotingModal
                wall={wall}
                onRequestWallUpdate={this.fetchWallData}
              />
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
