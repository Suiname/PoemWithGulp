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
            <div className="modalHeader twelve columns">{recipient}</div>
            <div className="privateMessage twelve columns">
              <div className="pmTextArea twelve columns">
                {this.props.pms[recipient] ?
                  this.props.pms[recipient] :
                  null}
              </div>
              <input type="textarea" id={`input.${recipient}`} className="pmTextbox twelve columns" onKeyPress={this.props.pmSubmit} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

Modal.propTypes = {
  recipients: PropTypes.array,
  pms: PropTypes.object,
  pmSubmit: PropTypes.func,
};

export default Modal;
