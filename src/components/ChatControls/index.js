import React from 'react';
import PropTypes from 'prop-types';

const ChatControls = ({
  className,
  inputValue,
  handleInputChange,
  handleKeyPress,
  sendMessage,
  getCatFact
}) => {
  return (
    <div className={className}>
      <input
        className="chat-input"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button
        className="send-message-button"
        onClick={sendMessage}
      >
        SEND
      </button>
      <button
        className="get-catfact-button"
        onClick={getCatFact}
      >
        GET CATFACT!
      </button>
    </div>
  );
};

ChatControls.defaultProps = {
  className: 'chat-controls'
};

ChatControls.propTypes = {
  className: PropTypes.string,
  inputValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  getCatFact: PropTypes.func.isRequired,
};

export default ChatControls;
