import React from 'react';
import {ModalWrapper, CloseModal} from './ModalWrapper.jsx';
const http = require('http');

export default class EditMemberModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			'teammember': null
		}

		this.setMember = this.setMember.bind(this);
	}

	setMember(uid) {
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

	componentDidMount() {
		let uid = this.props.modalProps.uid;
		this.setMember(uid);
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
			'uid': '',
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

		const uid = this.state.uid;
		const name = this.state.nameValue;

		const body = JSON.stringify({
			'uid': uid,
			'name': name
		});
		console.log(body);

		const post_options = {
			host: 'localhost',
			port: 8083,
			path: '/member',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(body)
			}
		}

		const post_req = http.request(post_options, function(res) {
			res.setEncoding('utf-8');
			res.on('end', function() {

			});
		})

		post_req.on('error', function(err) {
			console.log('error: '+err.message);
		})

		post_req.write(body);
		post_req.end();
	}

	componentDidMount() {
		console.log(this.props.teammember);
		this.setState({
			'uid': this.props.teammember.uid,
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
