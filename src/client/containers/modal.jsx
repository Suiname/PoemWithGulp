import React, { PropTypes } from 'react';

class Modal extends React.Component {
  render() {
    if (this.props.recipients.length === 0) {
      return null;
    }
    return (
      <div className="row" id="modalContainer">
        {this.props.recipients.map((recipient) =>
          <div className="three columns modalBox">
            <div className="modalHeader">{recipient}</div>
          </div>
        )}
      </div>
    );
  }
}

Modal.propTypes = {
  recipients: PropTypes.array,
};

export default Modal;
