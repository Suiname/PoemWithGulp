import React, { PropTypes } from 'react';

class Modal extends React.Component {
  render() {
    if (this.props.recipients.length === 0) {
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
  recipients: PropTypes.array,
};

export default Modal;
