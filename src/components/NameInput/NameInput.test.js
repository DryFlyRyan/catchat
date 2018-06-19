/* eslint-disable no-undef */
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NameInput from './index';

configure({ adapter: new Adapter() });

const setup = ({
  inputValue,
  handleInputChange,
  handleKeyPress
}) => {
  const mockFunction = () => {};
  const constructedProps = {
    inputValue: inputValue || '',
    handleInputChange: handleInputChange || mockFunction,
    handleKeyPress: handleKeyPress || mockFunction,
  };
  return shallow(<NameInput {...constructedProps} />);
};

describe('NameInput renders', () => {
  it('when setup is called', () => {
    setup({});
  });
});

describe('NameInput updates based on', () => {
  const inputValue = 'new input';
  const app = setup({ inputValue });

  it('initial inputValue', () => {
    expect(app.find('.name-input-input').get(0).props.value).toEqual(inputValue);
  });
  it('updated inputValue', () => {
    const nextInputValue = 'next input value';
    app.setProps({ inputValue: nextInputValue });
    expect(app.find('.name-input-input').get(0).props.value).toEqual(nextInputValue);
  });
});

describe('NameInput calls functions appropriately when', () => {
  it('Input is changed', () => {
    const mockFn = jest.fn();
    const app = setup({ handleInputChange: mockFn });
    app.find('.name-input-input').simulate('change');
    expect(mockFn.mock.calls.length).toBe(1);
  });
  it('Input registers a keypress', () => {
    const mockFn = jest.fn();
    const app = setup({ handleKeyPress: mockFn });
    app.find('.name-input-input').simulate('keypress');
    expect(mockFn.mock.calls.length).toBe(1);
  });
});
