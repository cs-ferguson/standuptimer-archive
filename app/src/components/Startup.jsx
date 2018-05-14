import React from 'react';
import {EditPencilImg} from './ButtonImages.jsx';

class NameBlock extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		if(event.target.checked){
			this.props.setPresent(event.target.id);
		} else {
			this.props.setAbsent(event.target.id);
		}
	}

	render() {
		return (
			<div className="nameblock">
				<input id={this.props.uid} type="checkbox" onChange={this.handleChange} defaultChecked />
				<label htmlFor={this.props.uid}>{this.props.name}</label>
				<EditName launchModal={this.props.launchModal} uid={this.props.uid} />
			</div>
		);
	}
}

export default class NameList extends React.Component {
	render() {
		return this.props.team.map((person, key) => <NameBlock key={key} name={person.name} uid={person.uid} setAbsent={this.props.setAbsent} setPresent={this.props.setPresent} launchModal={this.props.launchModal} />);
	}
}

class EditName extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
			e.preventDefault();
			this.props.launchModal('edit_member',{'uid':this.props.uid});
	}

	render () {
		return <button onClick={this.handleClick} className="editIcon"><EditPencilImg /></button>
	}
}
