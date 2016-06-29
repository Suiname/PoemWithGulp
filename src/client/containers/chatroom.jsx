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
        <div className="twelve columns">
          <div id="chatbox" className="twelve columns">{this.props.chatlog.map((chat) =>
            <p>{chat}</p>
          )}</div>
          <div className="twelve columns">
            <form>
              <input type="textarea" value={this.props.chatWindow} onChange={this.props.chatType} />
              <button onClick={this.props.submitChat}>Chat</button>
            </form>
          </div>
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
