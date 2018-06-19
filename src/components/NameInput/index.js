import React from 'react';
import PropTypes from 'prop-types';

const NameInput = ({ inputValue, handleInputChange, handleKeyPress }) => {
  return (
    <div>
      <input
        className="name-input-input"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="What's your name?"
      />
    </div>
  );
};

NameInput.propTypes = {
  inputValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired
};

export default NameInput;
