import React from 'react';
import Clock from './Clock.jsx';
import {ExitButton, NextTimerButton, PrevTimerButton} from './Buttons.jsx';
import {Audio, Video, Image} from './Media.jsx';

export default class TimerContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			'progress': 0
		};
		this.nextTimer = this.nextTimer.bind(this);
		this.prevTimer = this.prevTimer.bind(this);
	}

	nextTimer() {
		let team_size = this.props.team.length;
		let next_index = parseInt(this.state.progress,10) + 1;
		console.log(next_index);
		if(next_index<team_size) {
			this.setState({'progress': next_index});
		}
	}

	prevTimer() {
		let prev_index = parseInt(this.state.progress,10) - 1;
		console.log(prev_index);
		if(prev_index>-1) {
			this.setState({'progress': prev_index});
		}
	}

	render() {
		return (
			<div className="timer_cont">
				{/*setting key forces remount!*/}
				<Timer key={this.state.progress} nextTimer={this.nextTimer} teammember={this.props.team[this.state.progress]} />
				<PrevTimerButton prevTimer={this.prevTimer} />
				<NextTimerButton nextTimer={this.nextTimer} />
				<ExitButton exitTimer={this.props.exitTimer} />
			</div>
		)
	}
}

class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			'flasher': true,
			'windowWidth': 0
		};
		this.endFlasher = this.endFlasher.bind(this);
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	endFlasher() {
		this.setState({'flasher': false});
	}

	componentDidMount() {
		this.flasherTimer = setTimeout(this.endFlasher, 4000);
		this.updateWindowDimensions();
	  window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		if(this.flasherTimer) {
			clearTimeout(this.flasherTimer);
		}
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
	  this.setState({'windowWidth': window.innerWidth});
	}

	setFontSize(name) {
		let size = this.state.windowWidth / name.length;
		return size;
	}

	render() {
		const media_element = this.props.teammember.video ? (
			<Video src={this.props.teammember.video} />
		) : (
			<Audio audio={this.props.teammember.audio} phrase={true} />
		)

		const image_element = this.props.teammember.background ? (
			<Image src={this.props.teammember.background} />
		) : (
			null
		)

		if(this.state.flasher){

			let divStyle = {
				'fontSize': this.setFontSize(this.props.teammember.name)
			}

			return (
				<div className="flasher">
					<h1 style={divStyle}>{this.props.teammember.name}</h1>
					{media_element}
					{image_element}
				</div>
			)
		} else {
			return (
				<div className="timer">
					<h1 className="nameheader">{this.props.teammember.name}</h1>
					<Clock startFrom='60' nextTimer={this.props.nextTimer} />
				</div>
			)
		}
	}
}
