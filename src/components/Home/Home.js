import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import scatData from '../../helpers/data/scats';

import './Home.scss';

class Home extends React.Component {
  state = {
    scats: [],
  }

  componentDidMount() {
    const { uid } = firebase.auth().currentUser;
    scatData.getMyScats(uid)
      .then(scats => this.setState({ scats }))
      .catch(err => console.error('could not get scats', err));
  }

  render() {
    const makeScatCards = this.state.scats.map(scat => (
      <h2>{scat.sampleName}</h2>
    ));

    return (
      <div className="Home">
        <h1>Home</h1>
          {makeScatCards}
      </div>
    );
  }
}

export default Home;
