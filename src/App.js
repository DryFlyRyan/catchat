import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageWindow from './components/MessageWindow';
import ChatControls from './components/ChatControls';
import NameInput from './components/NameInput';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      chatInput: '',
      userName: '',
      userNameSet: false,
      userId: props.id
    };
    this.io = props.io;
  }

  componentDidMount = () => {
    this.io.on('welcome', socket => {
      this.setState({ messages: [...this.state.messages, socket] });
    });

    this.io.on('messageDown', socket => {
      this.setState({ messages: [...this.state.messages, socket] });
    });
  }

  getCatFact = () => {
    this.emit('getCatFact');
  }

  // Since we want to include the userId with every emit, I've created a helper function
  // to handle emits here. Normally this would be stored in a utils file somewhere, but since
  // we're only using emits in this component, it would be preoptimizing to do so.
  emit = (type, message, callback) => {
    if (typeof type !== 'string') {
      console.error('Emit types must be strings'); // eslint-disable-line
      return;
    }
    const payload = {
      userId: this.state.userId,
      msg: message
    };
    this.io.emit(type, payload);
    if (callback) {
      callback();
    }
  }

  handleInputChange = input => {
    this.setState({ chatInput: input.target.value });
  };

  handleNameInputChange = nameInput => {
    this.setState({ userName: nameInput.target.value });
  }

  handleKeyPress = e => {
    if (e.key !== 'Enter') {
      return;
    }
    this.sendMessage();
  }

  handleNameKeyPress = nameInput => {
    if (nameInput.key !== 'Enter') {
      return;
    }
    this.emit('userNameSet', this.state.userName, () => this.setState({ userNameSet: true }));
  }

  sendMessage = () => {
    this.setState({ chatInput: '' });
    this.emit('messageUp', this.state.chatInput);
  }

  render() {
    const {
      messages,
      chatInput,
      userName,
      userNameSet
    } = this.state;
    return (
      <div className="App">
        {userNameSet ?
          <div>
            <MessageWindow
              className="message-window"
              messages={messages}
            />
            <ChatControls
              className="chat-controls"
              inputValue={chatInput}
              handleInputChange={this.handleInputChange}
              handleKeyPress={this.handleKeyPress}
              sendMessage={this.sendMessage}
              getCatFact={this.getCatFact}
            />
          </div> :
          <div>
            <NameInput
              className="name-input"
              inputValue={userName}
              handleInputChange={this.handleNameInputChange}
              handleKeyPress={this.handleNameKeyPress}
            />
          </div>
        }
      </div>
    );
  }
}

App.propTypes = {
  io: PropTypes.shape({}).isRequired,
  id: PropTypes.string.isRequired
};

export default App;
