import React, { PropTypes } from 'react';

class Modal extends React.Component {
  componentDidUpdate() {
    if (this.props.recipients.length > 0 && this.props.lastpm) {
      const objDiv = document.getElementById(`pmtext.${this.props.lastpm}`);
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }
  render() {
    if (this.props.recipients.length === 0) {
      return null;
    }
    return (
      <div className="row" id="modalContainer">
        {this.props.recipients.map((recipient) =>
          <div className="three columns modalBox">
            <div className="modalHeader twelve columns">{recipient}<i id={`askToPoem.${recipient}`} className="fa fa-pencil u-pull-right" aria-hidden="true" onClick={this.props.askToPoem}></i></div>
            <div className="privateMessage twelve columns">
              <div id={`pmtext.${recipient}`} className="pmTextArea twelve columns">
                {this.props.pms[recipient] ?
                  this.props.pms[recipient].map((message) => <p>{message}</p>) :
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
  lastpm: PropTypes.string,
  askToPoem: PropTypes.func,
};

export default Modal;
