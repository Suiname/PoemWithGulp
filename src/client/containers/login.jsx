import React from 'react';
import io from 'socket.io-client';
var socket = io.connect();

class LoginBox extends React.Component {
  constructor() {
    super();
    this.state = { txtvalue: '', userList:[], userMessage:'' };
    this.textType = this.textType.bind(this);
    this.submitUser = this.submitUser.bind(this);
    this.allUsers = this.allUsers.bind(this);
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
  submitUser(e){
    e.preventDefault();
    socket.emit('adduser', { username:this.state.txtvalue });
  }
  allUsers(e){
    e.preventDefault();
    console.log("Listusers: ", socket.emit('listusers'));
    socket.emit('listusers');
  }
  render() {
    return (
      <div className="row">
        <div className="twelve columns">This is a chatroom</div>
        <div className="six columns">
          <form>
            <input type="textarea" value={this.state.txtvalue} onChange={this.textType} />
            <button onClick={this.submitUser}>Login</button>
            <button onClick={this.allUsers}>UserList</button>
          </form>
        </div>
        <div className="six columns">
          <p>Users Logged in</p>
          <div>{this.state.userList.length == 0 ? <img src='/images/spinner.gif'></img> : this.state.userList.map((user) => { return <p>{user}</p>; })}</div>
          <p>User Messages:</p>
          <p>{this.state.userMessage}</p>
        </div>
      </div>
    );
  }
}

export default LoginBox;
