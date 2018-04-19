import React from 'react';

class NameBlock extends React.Component {
	render() {
		return (
			<div className="nameblock">
				<input htmlFor={this.props.name} type="checkbox" defaultChecked />
				<label id={this.props.name}>{this.props.name}</label>
			</div>
		);
	}
}

export default class NameList extends React.Component {
	render() {
		return this.props.team.map((person, key) => <NameBlock key={key} name={person.name} />);
	}
}
