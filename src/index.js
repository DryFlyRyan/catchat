import React from 'react';
import ReactDOM from 'react-dom';
import ioClient from 'socket.io-client';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const userId = Math.random().toString(36).substr(2, 9);
const io = ioClient('http://localhost:3000', { query: `userId=${userId}` });

ReactDOM.render(<App io={io} id={userId} />, document.getElementById('root'));
registerServiceWorker();
