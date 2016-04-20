var React = require('react');
var ReactDOM = require('react-dom')
var io = require('socket.io-client')
var socket = io.connect();

var Container = React.createClass({
    getInitialState: function(){
      return {logged: false, users: [], chatBoxes: [], chatOpen: false, userMessage: '', PrvMsgData: []}
    },
    componentDidMount: function(){
      var self = this;

      socket.on('updateUsers', function(data){
        console.log(data)
        var state = self.state;
        state.users = data;
        self.setState(state);
      });

      socket.on('updateChat', function(data){
        var state = self.state;
         state.userMessage = data
         self.setState(state)
      })

      socket.on('updatePrivateChat', function(from, userTo, privateMessage){
        console.log(from)
        console.log(userTo)
        console.log(privateMessage)
        var state = self.state;
        state.PrvMsgData.push({
          from: from,
          userTo: userTo,
          privateMessage: privateMessage
        })

        if(self.state.chatBoxes.indexOf(userTo) > -1){
          state.chatOpen = true;
          self.setState(state)
          console.log('if happened')
          self.setState(state)
        }
        else {
          state.chatOpen = true;
          state.chatBoxes.push(from)
          self.setState(state)
        }


        console.log('-------------------- this is updatePrivateCHat')



      })
    },
    getIndex: function(someArray, users){
      return someArray.indexOf(users)
    },
    removeBox: function(user){
       this.setState([this.state.chatBoxes.splice(this.getIndex(this.state.chatBoxes, user), 1)])
    },
    addChatBox: function(username){
      var state = this.state;
      state.chatBoxes.push(username)
      state.chatOpen = !false
      this.setState(state)
    },
    hasSubmitted: function(submitted){
      if(submitted === 'true'){
        var state     = this.state;
        state.logged  = !false;
        this.setState(state)
      }
    },
    render: function(){
      console.log(this.state)
      console.log('line 18')
      return (
                <div class='container'>
                    {this.state.logged ? <UserList userMessage={this.state.userMessage} users={this.state.users} chatOpen={this.state.chatOpen} logged={this.state.logged} addChatBox={this.addChatBox}/> : <Username logged={this.hasSubmitted}/>}
                  <div id="prvBoxarea" className="nine columns">
                    {this.state.chatOpen && this.state.logged ? <PrivateMessageBox PrvMsgData={this.state.PrvMsgData} chatBoxes={this.state.chatBoxes} removeBox={this.removeBox}/> : null}
                  </div>
                </div>
           )
         }
      })

  var UserList = React.createClass({
      userClick: function(user){
        console.log('clicked happened')
        console.log(user)
        this.props.addChatBox(user);
        console.log('this is line 50')
      },
      render: function(){
        var self = this;
        var users = this.props.users.map(function(user, i){
          return (
            <li key={i} onClick={self.userClick.bind(self, user)} value={user}>{user}</li>
            )
        })

        return (
          <div className='row'>
            <div id="userList" className="three columns">
              <p>{this.props.userMessage}</p>
              <h5>Users</h5>
              <ul>{users}</ul>
            </div>
          </div>
          )
      }
    })



// This is the Parent Component for the Private Message Box
// #########################################################################
  var PrivateMessageBox = React.createClass({
    removeClick: function(user){
      console.log(user);
      this.props.removeBox(user);
    },
    render: function(){
      var self = this;
      console.log(this.props.PrvMsgData)
      console.log('thiss is privateMessageBox')
      var userBoxes = this.props.chatBoxes.map(function(user, i){
        return   <div className="PrivateMessageBox" key={i}>
                    <PrivateMessageHeader data={user}/>
                    <PrivateMessageButton removeClick={self.removeClick} data={user}/>
                    <PrivateMessageArea PrvMsgData={self.props.PrvMsgData}/>
                    <PrivateMessageInput data={user}/>
                 </div>
               })

        return (
           <div>{userBoxes}</div>
          )
        }
     })


  var PrivateMessageHeader = React.createClass({
    render: function(){
      return (
         <h4 className='prvUserInfo'>{this.props.data}</h4>
        )
    }
  })

  var PrivateMessageButton = React.createClass({
    render: function(){
      return (
        <button className='removeButton' onClick={this.props.removeClick.bind(this, this.props.user)}>X</button>
        )
    }
  })

  var PrivateMessageInput = React.createClass({
   getInitialState: function(){
      return {privateMessage: ''}
    },
    componentDidMount: function(){

    },
    handlePrivateMessage: function(event){
      var state = this.state;
      state.privateMessage = event.target.value;
      this.setState(state);
    },
    submitMessage: function(user, event){
      console.log(user)
        if(event.charCode === 13){
        console.log('event')
        var userTo = user;
        var privateMessage = this.state.privateMessage;
        socket.emit('pm', userTo, privateMessage)
        this.setState({privateMessage: ''})
      }
    },
    render: function(){
      return (
        <input className='prvSend' onChange={this.handlePrivateMessage} onKeyPress={this.submitMessage.bind(this, this.props.data)} value={this.state.privateMessage} />
        )
    }
  })


  var PrivateMessageArea = React.createClass({
    render: function(){
      var userData = this.props.PrvMsgData.map(function(data, i){
        return (
          <p key={i}>{data.from + " : " + data.privateMessage + " to: " + data.userTo}</p>
          )
      })
      return (
         <div className='PrivateMessage'>
          {userData}
         </div>
        )

    }
  })

// This is the Parent Component for the Private Message Box
// #########################################################################


// Login information for when a user connects


  var Username = React.createClass({
      getInitialState: function(){
        return {username: ''}
      },
      handleNameChange: function(event){
        var state = this.state;
        state.username = event.target.value;
        this.setState(state)
      },
      handleSubmit: function(e){
        e.preventDefault()
        var state = this.state;
        //emit the username to the server
        socket.emit('adduser', state)
        state.username  = '';

        this.props.logged('true')
        // this.setState(state)
      },
      render: function(){
        console.log(this.props)
        console.log('line 54')
        return (
          <form className='username' onSubmit={this.handleSubmit}>
            <div class='row'>
              <div class='twelve columns'>
                <input type="text" placeholder="Username Biotch" onChange={this.handleNameChange} value={this.state.username}/>
              </div>
            </div>
          </form>
          )
         }
      })




ReactDOM.render(<Container />, document.getElementById('container'))
