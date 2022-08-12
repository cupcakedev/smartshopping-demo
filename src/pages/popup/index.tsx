import React from 'react';
import ReactDOM from 'react-dom';
import { Popup } from './components/Popup';

document.addEventListener('DOMContentLoaded', () => {
    const rootEl = document.getElementById('root');
    ReactDOM.render(<Popup />, rootEl);
});
