/* eslint-disable no-undef */
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChatControls from './index';

configure({ adapter: new Adapter() });

const setup = ({
  inputValue,
  handleInputChange,
  handleKeyPress,
  sendMessage,
  getCatFact
}) => {
  const mockFunction = () => {};
  const constructedProps = {
    inputValue: inputValue || '',
    handleInputChange: handleInputChange || mockFunction,
    handleKeyPress: handleKeyPress || mockFunction,
    sendMessage: sendMessage || mockFunction,
    getCatFact: getCatFact || mockFunction
  };
  return shallow(<ChatControls {...constructedProps} />);
};

describe('ChatControls renders', () => {
  it('when Setup is called', () => {
    setup({});
  });
});

describe('ChatControls updates based on', () => {
  const inputValue = 'new input';
  const app = setup({ inputValue });

  it('initial inputValue', () => {
    expect(app.find('.chat-input').get(0).props.value).toEqual(inputValue);
  });
  it('updated inputValue', () => {
    const nextInputValue = 'next input value';
    app.setProps({ inputValue: nextInputValue });
    expect(app.find('.chat-input').get(0).props.value).toEqual(nextInputValue);
  });
});

describe('ChatControls calls functions appropriately when', () => {
  it('Input is changed', () => {
    const mockFn = jest.fn();
    const app = setup({ handleInputChange: mockFn });
    app.find('.chat-input').simulate('change');
    expect(mockFn.mock.calls.length).toBe(1);
  });
  it('Input registers a keypress', () => {
    const mockFn = jest.fn();
    const app = setup({ handleKeyPress: mockFn });
    app.find('.chat-input').simulate('keypress');
    expect(mockFn.mock.calls.length).toBe(1);
  });
  it('Send Button registers a click', () => {
    const mockFn = jest.fn();
    const app = setup({ sendMessage: mockFn });
    app.find('.send-message-button').simulate('click');
    expect(mockFn.mock.calls.length).toBe(1);
  });
  it('Get CatFact! registers a click', () => {
    const mockFn = jest.fn();
    const app = setup({ getCatFact: mockFn });
    app.find('.get-catfact-button').simulate('click');
    expect(mockFn.mock.calls.length).toBe(1);
  });
});
