import React from 'react';
import { Link } from 'react-router-dom';

import scatData from '../../helpers/data/scats';

import './SingleScat.scss';

class SingleScat extends React.Component {
  state = {
    scat: {},
  }

  componentDidMount() {
    const scatId = this.props.match.params.id;
    scatData.getSingleScat(scatId)
      .then(scatPromise => this.setState({ scat: scatPromise.data }))
      .catch(err => console.error('unable to get single scat', err));
  }

  deleteScat = () => {
    const scatId = this.props.match.params.id;
    scatData.deleteScat(scatId)
      .then(() => this.props.history.push('/home'))
      .catch(err => console.error('unable to delete', err));
  }

  render() {
    const { scat } = this.state;
    const editLink = `/edit/${this.props.match.params.id}`;
    return (
      <div className="SingleScat">
        <h1>{scat.sampleName}</h1>
        <h2>{scat.location}</h2>
        <h3>{scat.animal}</h3>
        <h4>{scat.color}</h4>
        <h5>{scat.weight}</h5>
        <Link className="btn btn-primary" to={editLink}>Edit</Link>
        <button className="btn btn-danger" onClick={this.deleteScat}>Delete</button>
      </div>
    );
  }
}

export default SingleScat;
