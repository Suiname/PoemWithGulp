import React from 'react';
import io from 'socket.io-client';
const socket = io.connect();
import Chatroom from './chatroom.jsx';
import Modal from './modal.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userList: [], userMessage: '', chatlog: [], chatWindow: '', recipients: [], pms: {}, lastpm: '', chooseToPoem: false, waiting: false, poeming: false, poemUserList: [] };
    this.chatType = this.chatType.bind(this);
    this.submitChat = this.submitChat.bind(this);
    this.openModal = this.openModal.bind(this);
    this.pmSubmit = this.pmSubmit.bind(this);
    this.askToPoem = this.askToPoem.bind(this);
    this.poemAccept = this.poemAccept.bind(this);
    this.poemDecline = this.poemDecline.bind(this);
    socket.emit('adduser', { username: props.username });
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
        if (fromUser === this.props.username) { // pm is from current user
          if (state.pms[toUser] === undefined) {
            state.pms[toUser] = [`${fromUser}: ${message}`];
          } else {
            state.pms[toUser].push(`${fromUser}: ${message}`);
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
    socket.on('poem?', (recipient, sender) => {
      if (sender === this.props.username) {
        this.setState((state) => {
          state.poemUserList = [sender, recipient];
          state.waiting = true;
          return state;
        });
      } else if (recipient === this.props.username) {
        this.setState((state) => {
          state.poemUserList = [sender, recipient];
          state.chooseToPoem = true;
          return state;
        });
      }
    });
    socket.on('EnterThePoemRoom', () => {
      this.setState((state) => {
        if (state.waiting) {
          state.waiting = false;
        }
        state.poeming = true;
      });
    });
    socket.emit('listusers');
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
      if (!state.recipients.includes(recipient) && recipient !== this.props.username) {
        state.recipients.push(recipient);
      }
      return state;
    });
  }
  submitChat(e) {
    e.preventDefault();
    this.setState((state) => {
      socket.emit('submitChat', state.chatWindow, this.props.username);
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
  askToPoem(e) {
    e.preventDefault();
    const recipient = e.target.id.split('.')[1];
    const sender = this.props.username;
    socket.emit('invite', recipient, sender);
    // implement later
  }
  poemAccept(e) {
    e.preventDefault();
    this.setState((state) => {
      state.chooseToPoem = false;
      state.waiting = false;
      state.poeming = true;
      socket.emit('chatAccepted', state.poemUserList[0], state.poemUserList[1]);
      return state;
    });
  }
  poemDecline(e) {
    e.preventDefault();
    this.setState((state) => {
      state.chooseToPoem = false;
      state.waiting = false;
      state.poemUserList = [];
      return state;
    });
  }
  render() {
    return (
      <div className="container">
        <Chatroom chatlog={this.state.chatlog} chatWindow={this.state.chatWindow} chatType={this.chatType} submitChat={this.submitChat} userList={this.state.userList} openModal={this.openModal} />
        <Modal recipients={this.state.recipients} pms={this.state.pms} pmSubmit={this.pmSubmit} lastpm={this.state.lastpm} askToPoem={this.askToPoem} />
        {this.state.waiting || this.state.chooseToPoem ?
          <div id="poemNotification">
            <h1>{this.state.chooseToPoem ? 'CHOOSE TO POEM' : 'Waiting for Response'}</h1>
            {this.state.chooseToPoem ? <div><button onClick={this.poemAccept}>Yes</button><button onClick={this.poemDecline}>naw</button></div> : null}
          </div> :
          null
        }
      </div>
    );
  }
}

App.propTypes = {
  username: React.PropTypes.string,
};

export default App;
