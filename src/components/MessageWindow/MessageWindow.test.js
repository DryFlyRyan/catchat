/* eslint-disable no-undef */
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MessageWindow from './index';

configure({ adapter: new Adapter() });

const setup = messages => {
  return shallow(<MessageWindow messages={messages} />);
};

describe('MessageWindow renders', () => {
  it('when setup is called', () => {
    setup();
  });
});

describe('MessageWindow', () => {
  it('displays no messages when none are passed', () => {
    const app = setup();
    expect(app.children().length).toBe(0);
  });
  it('displays a single message when a single message is passed', () => {
    const app = setup([{
      msg: 'single message'
    }]);
    expect(app.children().length).toBe(1);
  });
  it('displays 1000 messages when 1000 messages are passed', () => {
    const messages = Array(1000)
      .fill(undefined)
      .map(() => {
        return {
          msg: 'mock message'
        };
      });
    const app = setup(messages);
    expect(app.children().length).toBe(1000);
  });
});

describe('Message component', () => {
  it('displays the passed message', () => {
    const message = 'test message';
    const app = setup([{
      msg: message
    }]);
    expect(app.find('.message').get(0).props.children).toEqual(`anon: ${message}`);
  });
  it('displays \'anon\' if no user is present', () => {
    const message = 'test message';
    const app = setup([{
      msg: message
    }]);
    expect(app.find('.message').get(0).props.children).toEqual(`anon: ${message}`);
  });
  it('displays the user name if one is provided', () => {
    const user = 'testname';
    const app = setup([{
      msg: '',
      user
    }]);
    expect(app.find('.message').get(0).props.children).toEqual(`${user}: `);
  });
  it('does not display the message if no user and no message exist', () => {
    const app = setup([{
      msg: ''
    }]);
    expect(app.children().length).toBe(0);
  });
});
