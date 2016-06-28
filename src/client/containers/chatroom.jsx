import React from 'react';

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className="row">
        <div className="twelve columns">
          <div className="six columns">{this.props.chatlog.map((chat) => {
            return <p>{chat}</p>;
          })}</div>
          <div className="six columns">
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
  chatlog: React.PropTypes.string,
  chatWindow: React.PropTypes.string,
  chatType: React.PropTypes.func,
  submitChat: React.PropTypes.func,
};

export default Chatroom;
