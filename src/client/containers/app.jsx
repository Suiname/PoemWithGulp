import React from 'react';
import io from 'socket.io-client';
var socket = io.connect();
import LoginBox from './login.jsx';
import Chatroom from './chatroom.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = { txtvalue: '', userList:[], userMessage:'', loggedIn: false, chatlog: [], chatWindow: '' };
    this.textType = this.textType.bind(this);
    this.submitUser = this.submitUser.bind(this);
    this.chatType = this.chatType.bind(this);
    this.submitChat = this.submitChat.bind(this);
  }
  componentDidMount(){
    socket.on('updateChat', (data, username) => {
      this.setState((state) => {
        state.userMessage = data;
        return state;
      });
    });
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
    socket.emit('listusers');
  }
  textType(e){
    const value = e.target.value;
    this.setState((state) => {
      state.txtvalue = value;
      return state;
    });
  }
  chatType(e){
    const value = e.target.value;
    this.setState((state) => {
      state.chatWindow = value;
      return state;
    });
  }
  submitUser(e){
    e.preventDefault();
    socket.emit('adduser', { username:this.state.txtvalue });
    this.setState((state) => {
      state.loggedIn = true;
    });
  }
  submitChat(e){
    e.preventDefault();
    socket.emit(this.state.chatWindow);
    this.setState((state) => {
      state.chatlog.push(state.chatWindow);
      state.chatWindow = '';
      return state;
    });
  }
  render(){
    return (
      <div className="container">
        {this.state.loggedIn ?
          <Chatroom chatlog={this.state.chatlog} chatWindow={this.state.chatWindow} chatType={this.chatType} submitChat={this.submitChat} /> :
          <LoginBox login={this.submitUser} txtvalue={this.state.txtvalue} textType={this.textType} />
        }
      </div>
    );
  }
}

export default App;
