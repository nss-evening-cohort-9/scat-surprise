import React from 'react';

import './EditScat.scss';

class EditScat extends React.Component {
  render() {
    const editId = this.props.match.params.id;

    return (
      <div className="EditScat">
        <h1>Edit Scat</h1>
        <h2>The editId is {editId}</h2>
      </div>
    );
  }
}

export default EditScat;
