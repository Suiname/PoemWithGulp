import React, { PropTypes } from 'react';
import io from 'socket.io-client';
var socket = io.connect();

class LoginBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row">
        <div className="twelve columns">Login Please</div>
        <div className="six columns">
          <form>
            <input type="textarea" value={this.props.txtvalue} onChange={this.props.textType} />
            <button onClick={this.props.login}>Login</button>
          </form>
        </div>
      </div>
    );
  }
}

LoginBox.propTypes = {
  txtvalue: React.PropTypes.string,
  textType: React.PropTypes.func,
  login: React.PropTypes.func,
};

export default LoginBox;
