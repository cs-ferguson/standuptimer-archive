import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import './scss/base.scss';
const http = require('http');

const url = 'http://localhost:8083/peeps';
http.get(url, res => {
  res.setEncoding('utf8');
  let body = '';
	res.on('error', (e) => {
		console.log(e);
	});
  res.on('data', data => {
    body += data;
  });
  res.on('end', () => {
    body = JSON.parse(body);
		let team = Object.values(body);
		ReactDOM.render(<App team={team} />, document.getElementById('app'));
  });
});
