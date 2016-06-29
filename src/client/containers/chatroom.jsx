import React from 'react';

class Chatroom extends React.Component {
  componentDidUpdate() {
    const objDiv = document.getElementById('chatbox');
    objDiv.scrollTop = objDiv.scrollHeight;
  }
  render() {
    if (!this.props.userList) {
      return null;
    }
    return (
      <div className="row">
        <div className="six columns">
          <div id="chatbox">{this.props.chatlog.map((chat) =>
            <p>{chat}</p>
          )}</div>
          <div>
            <form>
              <input type="textarea" value={this.props.chatWindow} onChange={this.props.chatType} />
              <button onClick={this.props.submitChat}>Chat</button>
            </form>
          </div>
        </div>
        <div id="userlistBox" className="six columns">
          <div className="userlistHeader">Users</div>
          {this.props.userList.map((user) =>
            <div className="usernameBox">
              {user}<div className="u-pull-right"><button>Message Me</button></div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Chatroom.propTypes = {
  chatlog: React.PropTypes.array,
  chatWindow: React.PropTypes.string,
  chatType: React.PropTypes.func,
  submitChat: React.PropTypes.func,
  userList: React.PropTypes.array,
};

export default Chatroom;
