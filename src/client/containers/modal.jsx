import React, { PropTypes } from 'react';

class Modal extends React.Component {
  render() {
    if (!this.props.recipient) {
      return null;
    }
    return (
      <div className="row">
        <div className="twelve columns">Modal section</div>
      </div>
    );
  }
}

Modal.propTypes = {
  recipient: PropTypes.string,
};

export default Modal;
