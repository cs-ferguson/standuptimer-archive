import React from 'react';
import NameList from './Startup.jsx';
import {StartButton} from './Buttons.jsx';
import TimerContainer from './Timer.jsx';
import Modal from './modals/ModalConductor.jsx';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			'mode': 'startup',
			'team': this.props.team,
			'modal': null,
			'modal_props': null
		};
		this.startTimer = this.startTimer.bind(this);
		this.exitTimer = this.exitTimer.bind(this);
		this.setPresent = this.setPresent.bind(this);
		this.setAbsent = this.setAbsent.bind(this);
		this.launchModal = this.launchModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	shuffleTeam(teamObj){
		let shuffledTeam = this.state.team
			.map(member => [Math.random(), member])
			.sort((a,b) => a[0] - b[0])
			.map(transformed_member => transformed_member[1]);

		return shuffledTeam;
	}

	startTimer() {
		this.setState({'mode': 'timer', 'team': this.shuffleTeam(this.props.team)})
	}

	exitTimer() {
		this.setState({'mode': 'startup', 'team': this.props.team})
	}

	setAbsent(uid) {
		this.setState({
			'team': this.state.team.filter(member => member.uid != uid)
		});
	}

	setPresent(uid) {
		function reAdd(old_team, start_team, uid) {
			let add_arr = start_team.filter(member => member.uid==uid);
			let new_team = old_team.concat(add_arr);
			return new_team;
		}

		this.setState({
			'team': reAdd(this.state.team, this.props.team, uid)
		})
	}

	launchModal(modal, modal_props) {
		this.setState({'modal': modal, 'modal_props': modal_props});
	}

	closeModal() {
		console.log('close');
		this.setState({'modal': null, 'modal_props': null});
	}

	preloadMedia() {
		this.props.team.forEach(function(teammember) {
			//video
			if(teammember.video) {
				var xhrReq = new XMLHttpRequest();
				xhrReq.open('GET', teammember.video, true);
				xhrReq.responseType = 'blob';

				xhrReq.onload = function() {
				    if (this.status === 200) {
				        var vid = URL.createObjectURL(this.response);
				    }
				}
				xhrReq.onerror = function() {
				    console.log('err' ,arguments);
				}
				xhrReq.onprogress = function(e){
				    if(e.lengthComputable) {
				        var percentComplete = ((e.loaded/e.total)*100|0) + '%';
				        console.log(teammember.video + ' progress: ', percentComplete);
				    }
				}
				xhrReq.send();
			}
		})
	}

	componentDidMount() {
		this.preloadMedia();
	}

	render() {
		if(this.state.mode=='startup'){
			return (
				<React.Fragment>
					<Modal content={this.state.modal} modalProps={this.state.modal_props} closeModal={this.closeModal} />
					<div className="teamlist">
						<NameList team={this.props.team} setAbsent={this.setAbsent} setPresent={this.setPresent} launchModal={this.launchModal} />
					</div>
					<StartButton startTimer={this.startTimer} />
				</React.Fragment>
			);
		} else {
			return (
				<TimerContainer team={this.state.team} exitTimer={this.exitTimer} />
			)
		}
	}
}
