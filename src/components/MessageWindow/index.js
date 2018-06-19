import React from 'react';
import PropTypes from 'prop-types';

const MessageWindow = ({ className, messages }) => {
  const constructedMessages = constructMessages(messages);
  return (
    <div className={className}>
      {constructedMessages}
    </div>
  );
};

const constructMessages = messages => {
  return messages.reduce((accum, message) => {
    if (!message.user && !message.msg) {
      return accum;
    }
    const key = `_${Math.random().toString(36).substr(2, 9)}`;
    const user = message.user || 'anon';
    const component = (
      <div
        className="message"
        key={key}
      >
        {`${user}: ${message.msg}`}
      </div>
    );
    return [...accum, component];
  }, []);
};

MessageWindow.defaultProps = {
  className: 'message-window',
  messages: []
};

MessageWindow.propTypes = {
  className: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.object)
};

export default MessageWindow;
