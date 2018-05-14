import React from 'react';

import EditMemberModal from './EditMemberModal.jsx';

export default class Modal extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		switch (this.props.content) {
			case 'edit_member':
				return <EditMemberModal closeModal={this.props.closeModal} modalProps={this.props.modalProps} />;

			default:
				return null;
		}
	}

}
