import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router';
import { BrowserRouter } from 'react-router'


ReactDOM.hydrate(<BrowserRouter><AppRouter/></BrowserRouter>, document.getElementById('root'));