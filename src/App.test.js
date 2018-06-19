/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';

configure({ adapter: new Adapter() });
// Just passing mocks to make sure this works
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App
    io={{
      on: () => {}
    }}
    id="123"
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// App Shallow Tests

const setup = (io, id) => {
  const defaultIo = {
    on: () => {}
  };
  const props = {
    io: io || defaultIo,
    id: id || 'fakeId'
  };
  return shallow(
    <App {...props} />
  );
};

describe('App Shallow Tests', () => {
  describe('Shallow renders and Setup Test', () => {
    it('renders when called', () => {
      setup();
    });
  });
  describe('Conditional Rendering Tests', () => {
    describe('When component has default State and Props', () => {
      const app = setup();
      it('displays a username input', () => {
        expect(app.find('.name-input').length).toBe(1);
      });
      it('does not display the message window', () => {
        expect(app.find('.message-window').length).toBe(0);
      });
      it('does not display the chat controls', () => {
        expect(app.find('.chat-controls').length).toBe(0);
      });
    });
    describe('When component has userNameSet set to true', () => {
      const app = setup();
      app.setState({ userNameSet: true });
      it('does not display a username input', () => {
        expect(app.find('.name-input').length).toBe(0);
      });
      it('does display the message window', () => {
        expect(app.find('.message-window').length).toBe(1);
      });
      it('does display the chat controls', () => {
        expect(app.find('.chat-controls').length).toBe(1);
      });
    });
  });
});

// ... Generally in prod I'd be using mocks or similar to test our emits and whatnot,
