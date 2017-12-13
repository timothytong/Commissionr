import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from '../src/components/LoginPage';
import UserPostsPage from '../src/components/UserPostsPage';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/components/App';

window.onload = () => {
  ReactDOM.render(
  	<BrowserRouter>
  		<App />
  	</BrowserRouter>,
  	document.getElementById('app'));
};
