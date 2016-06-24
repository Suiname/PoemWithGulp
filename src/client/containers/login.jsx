import React from 'react';
import io from 'socket.io-client';
var socket = io.connect();

class LoginBox extends React.Component {
  constructor() {
    super();
    this.state = { txtvalue: '' };
    this.textType = this.textType.bind(this);
    this.submitUser = this.submitUser.bind(this);
  }
  textType(e){
    const value = e.target.value;
    this.setState((state) => {
      state.txtvalue = value;
      return state;
    });
  }
  submitUser(e){
    e.preventDefault();
    socket.emit('adduser', { username:this.state.txtvalue });
  }
  render() {
    return (
      <div className="row">
        <div className="twelve columns">This is a chatroom</div>
        <div className="six columns">
          <form>
            <input type="textarea" value={this.state.txtvalue} onChange={this.textType} />
            <button onClick={this.submitUser}>Login</button>
          </form>
        </div>
        <div className="six columns">
          <p>{this.state.txtvalue}</p>
        </div>
      </div>
    );
  }
}

export default LoginBox;
