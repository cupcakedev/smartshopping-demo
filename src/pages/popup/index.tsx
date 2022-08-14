import React from 'react';
import ReactDOM from 'react-dom/client';
import { Popup } from './components/Popup';

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

ReactDOM.createRoot(root).render(<Popup />);
