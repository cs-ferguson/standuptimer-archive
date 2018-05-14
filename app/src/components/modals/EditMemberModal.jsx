import React from 'react';
import {ModalWrapper, CloseModal} from './ModalWrapper.jsx';
const http = require('http');
const querystring = require('querystring');

export default class EditMemberModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			'teammember': null
		}
	}

	componentDidMount() {
		let uid = this.props.modalProps.uid;

		let member = new Promise (function (resolve, reject) {
			const url = 'http://localhost:8083/member/' + uid;
			http.get(url, res => {
			  res.setEncoding('utf8');
			  let body = '';
				res.on('error', (e) => {
					reject(e);
				});
			  res.on('data', data => {
			    body += data;
			  });
			  res.on('end', () => {
			    body = JSON.parse(body);
					let teammember = Object.values(body);
					resolve(teammember[0]);
			  });
			});
		})

		member.then((teammember) => {
			this.setState({'teammember': teammember});
		})
	}

	render() {
		if(this.state.teammember) {
			return (
				<ModalWrapper>
					<h1>Edit {this.state.teammember.name}</h1>
					<EditMemberForm teammember={this.state.teammember} />
					<CloseModal closeModal={this.props.closeModal} />
				</ModalWrapper>
			)
		} else {
			return 'loading...';
		}
	}
}

class EditMemberForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			'nameValue': ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		switch(e.target.id) {
			case 'name_input':
				this.setState({'nameValue': e.target.value});
			default:
				return null;
		}
	}

	handleSubmit(e) {
		e.preventDefault();

		const teammember = this.state.nameValue;

		console.log(this.state.nameValue);
		console.log(teammember);

		const post_options = {
			host: 'api',
			port: 8083,
			path: '/member',
			method: 'POST',
			headers: { 'Content-type': 'application/x-www-form-urlencoded' }
		}

		const post_req = http.request(post_options, function(res) {
			res.setEncoding('utf-8');
			res.on('data', function(chunk) {
				console.log('response:');
			});
		})

		post_req.on('error', function(err) {
			console.log('error: '+err.message);
		})

		post_req.write(teammember);
		post_req.end;
	}

	componentDidMount() {
		console.log(this.props.teammember.name);
		this.setState({
			'nameValue': this.props.teammember.name
		})
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} >
				<input id="name_input" type="text" value={this.state.nameValue} onChange={this.handleChange} />
				<label htmlFor="name_input">Name</label>
				<input type="submit" value="Submit" />
			</form>
		)
	}
}
