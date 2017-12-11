import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from '../src/components/LoginPage';

window.onload = () => {
  ReactDOM.render(
  	<LoginPage />, 
  	document.getElementById('app'));
};
