import React from 'react';
import LoginBox from './components/loginBox.jsx';
import App from './app.jsx';
import io from 'socket.io-client';
const socket = io.connect();


class Login extends React.Component {
  constructor() {
    super();
    this.state = { username: '', loggedIn: false, txtvalue: '' };
    this.textType = this.textType.bind(this);
    this.submitUser = this.submitUser.bind(this);
  }
  submitUser(e) {
    e.preventDefault();
    const username = this.state.txtvalue;
    this.setState((state) => {
      state.username = username;
      state.loggedIn = true;
      socket.emit('adduser', { username });
      return state;
    });
  }
  textType(e) {
    const value = e.target.value;
    this.setState((state) => {
      state.txtvalue = value;
      return state;
    });
  }
  render() {
    return (
      <div className="container">
        {this.state.loggedIn ? <App username={this.state.username} loggedIn={this.state.loggedIn} /> : <LoginBox txtvalue={this.state.txtvalue} textType={this.textType} login={this.submitUser} />}
      </div>
    );
  }
}

export default Login;
