import React from 'react';
import NameList from './Startup.jsx';
import {StartButton} from './Buttons.jsx';
import TimerContainer from './Timer.jsx';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			'mode': 'startup',
			'team': this.props.team
		};
		this.startTimer = this.startTimer.bind(this);
		this.exitTimer = this.exitTimer.bind(this);
	}

	startTimer() {
		this.setState({'mode': 'timer'})
	}

	exitTimer() {
		this.setState({'mode': 'startup'})
	}

	preloadMedia() {
		this.props.team.forEach(function(teammember) {
			//audio
			if(teammember.audio) {
				var xhrReq = new XMLHttpRequest();
				xhrReq.open('GET', 'http://localhost:8083/audio/'+teammember.audio, true);
				xhrReq.responseType = 'blob';

				xhrReq.onload = function() {
				    if (this.status === 200) {
				        var audio = URL.createObjectURL(this.response);
				    }
				}
				xhrReq.onerror = function() {
				    console.log('err' ,arguments);
				}
				xhrReq.onprogress = function(e){
				    if(e.lengthComputable) {
				        var percentComplete = ((e.loaded/e.total)*100|0) + '%';
				        console.log('progress: ', percentComplete);
				    }
				}
				xhrReq.send();
			}

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
				        console.log('progress: ', percentComplete);
				    }
				}
				xhrReq.send();
			}
		})
	}

	shuffleTeam(teamObj){
		let shuffledTeam = this.props.team
			.map(member => [Math.random(), member])
			.sort((a,b) => a[0] - b[0])
			.map(transformed_member => transformed_member[1]);

		console.log(shuffledTeam);
		return shuffledTeam;
	}

	componentDidMount() {
		this.preloadMedia();
		this.setState({'team': this.shuffleTeam(this.props.team)})
	}

	render() {

		if(this.state.mode=='startup'){
			return (
				<React.Fragment>
					<div className="teamlist">
						<NameList team={this.state.team} />
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
