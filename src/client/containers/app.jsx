import React from 'react';
import io from 'socket.io-client';
var socket = io.connect();

class App extends React.Component {
  constructor() {
    super()
    this.state = {logged: false, loggedHeader: false, users: [], chatBoxes: [], chatOpen: false, userMessage: '', PrvMsgData: [], room: false, modal: false, user: '', roomUsers: {}, txtvalue: ''};
    this.textType = this.textType.bind(this);
  }
  componentDidMount(){
    socket.on('updateUsers', (data) => {
      this.setState((state) => {
        state.users = data;
        return state;
      })
    });

    socket.on('updateChat', (data, username) => {
      this.setState((state) => {
        socket.username = username;
        state.userMessage = data;
        return state
      })
    })

    socket.on('updatePrivateChat', function(from, userTo, privateMessage){
      console.log(from)
      console.log(userTo)
      console.log(privateMessage)
      this.setState((state) => {
        if (privateMessage != 'poemWithMeAccepted'){
               state.PrvMsgData.push({
                from: from,
                userTo: userTo,
                privateMessage: privateMessage
              })
              return state;
           }


        if(state.chatBoxes.indexOf(userTo) > -1 && privateMessage != 'poemWithMeAccepted' || state.chatBoxes.indexOf(from) > -1 && privateMessage != 'poemWithMeAccepted'){
          state.chatOpen = true;
          console.log(userTo);
          console.log('if happened----------------------------------------------------------------------------------------------------------------')
          return state;
        }
        else if(privateMessage != 'poemWithMeAccepted'){
          state.chatOpen = true;
          state.chatBoxes.push(from)
          console.log(from)
          console.log('else happened --------------------------------------------------------------------------------------------------------------')
          return state;
        }

        if(privateMessage === 'Would You like to Poem with Me' && socket.username === userTo ){
          state.modal = true;
          state.user = from;

          console.log('poeom with me happppend ddafkdjasklfjadsklfjasdklfjasd')
          return state;
        }
        else if (privateMessage === 'poemWithMeAccepted'){
          console.log('poemWithMeAccepted-------------------------------------');
        }
      })

    })


    socket.on('EnterThePoemRoom', function(message, users){
      console.log(message)
      console.log(users)

      var state = self.state;
      state.room = true;
      state.roomUsers = users;
      self.setState(state);
      console.log(self.state);


    })
  }
  textType(e){
    let value = e.target.value;
    this.setState((state) => {
      state.txtvalue = value;
      socket.emit(value);
      return state;
    })
  }
  render(){
    return(
      <div className="row">
        <div className="twelve columns">This is a chatroom</div>
        <div className="six columns">
          <form>
            <input type="textarea" value={this.state.txtvalue} onChange={this.textType}/>
          </form>
        </div>
        <div className="six columns">
          <p>{this.state.txtvalue}</p>
        </div>

      </div>


    )
  }
}

export default App
