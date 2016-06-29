import React from 'react';
import io from 'socket.io-client';
const socket = io.connect();
import LoginBox from './login.jsx';
import Chatroom from './chatroom.jsx';
import Modal from './modal.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = { txtvalue: '', userList: [], userMessage: '', loggedIn: false, chatlog: [], chatWindow: '', username: '', recipients: [], pms: {}, lastpm: '' };
    this.textType = this.textType.bind(this);
    this.submitUser = this.submitUser.bind(this);
    this.chatType = this.chatType.bind(this);
    this.submitChat = this.submitChat.bind(this);
    this.openModal = this.openModal.bind(this);
    this.pmSubmit = this.pmSubmit.bind(this);
  }
  componentDidMount() {
    socket.on('updateUsers', (data) => {
      this.setState((state) => {
        state.userList = data;
        return state;
      });
    });
    socket.on('ListUsers', (data) => {
      this.setState((state) => {
        state.userList = data;
        return state;
      });
    });
    socket.on('submitChat', (data, username) => {
      this.setState((state) => {
        state.chatlog.push(`${username}: ${data}`);
        return state;
      });
    });
    socket.on('updatePrivateChat', (fromUser, toUser, message) => {
      this.setState((state) => {
        if (fromUser === state.username) { // pm is from current user
          if (state.pms[toUser] === undefined) {
            state.pms[toUser] = [`${toUser}: ${message}`];
          } else {
            state.pms[toUser].push(`${toUser}: ${message}`);
          }
          state.lastpm = toUser;
        } else { // pm is to current user
          if (!state.recipients.includes(fromUser)) {
            state.recipients.push(fromUser);
          }
          if (state.pms[fromUser] === undefined) {
            state.pms[fromUser] = [`${fromUser}: ${message}`];
          } else {
            state.pms[fromUser].push(`${fromUser}: ${message}`);
          }
          state.lastpm = fromUser;
        }
        return state;
      });
    });
    socket.emit('listusers');
  }
  textType(e) {
    const value = e.target.value;
    this.setState((state) => {
      state.txtvalue = value;
      return state;
    });
  }
  chatType(e) {
    const value = e.target.value;
    this.setState((state) => {
      state.chatWindow = value;
      return state;
    });
  }
  openModal(e) {
    e.preventDefault();
    const recipient = e.target.id;
    this.setState((state) => {
      if (!state.recipients.includes(recipient) && recipient !== state.username) {
        state.recipients.push(recipient);
      }
      return state;
    });
  }
  submitUser(e) {
    e.preventDefault();
    socket.emit('adduser', { username: this.state.txtvalue });
    this.setState((state) => {
      state.username = state.txtvalue;
      state.loggedIn = true;
    });
  }
  submitChat(e) {
    e.preventDefault();
    this.setState((state) => {
      socket.emit('submitChat', state.chatWindow, this.state.username);
      state.chatWindow = '';
      return state;
    });
  }
  pmSubmit(e) {
    if (e.key === 'Enter') {
      const value = e.target.value;
      const sender = e.target.id.split('.')[1];
      e.target.value = '';
      socket.emit('pm', sender, value);
    }
  }
  render() {
    return (
      <div className="container">
        {this.state.loggedIn ?
          <Chatroom chatlog={this.state.chatlog} chatWindow={this.state.chatWindow} chatType={this.chatType} submitChat={this.submitChat} userList={this.state.userList} openModal={this.openModal} /> :
          <LoginBox username={this.state.username} login={this.submitUser} txtvalue={this.state.txtvalue} textType={this.textType} />
        }
        <Modal recipients={this.state.recipients} pms={this.state.pms} pmSubmit={this.pmSubmit} lastpm={this.state.lastpm} />
      </div>
    );
  }
}

export default App;
