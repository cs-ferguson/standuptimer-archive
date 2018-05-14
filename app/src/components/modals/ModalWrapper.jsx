import React from 'react';

export class ModalWrapper extends React.Component {
	render() {
		return (
			<div id="overlay">
				<div className="modal">
					{this.props.children}
				</div>
			</div>
		);
	}
}

export class CloseModal extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
			e.preventDefault();
			this.props.closeModal();
	}

	render() {
		return (
			<button onClick={this.handleClick}>Close</button>
		);
	}
}
