import React from 'react';
import {PauseButton, PlayButton, ResetButton} from './Buttons.jsx';
import {Audio} from './Media.jsx';

export default class Clock extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			'running': false,
			'current_time': this.props.startFrom,
			'perc_progress': 1,
			'ended': false
		};
		this.pause = this.pause.bind(this);
		this.start = this.start.bind(this);
		this.reset = this.reset.bind(this);
	}

	start() {
		let endTime = new Date().getTime() + (this.state.current_time * 1000);
		this.clockTimer = setInterval( () => this.tick(endTime), 50);
	}

	stop() {
		this.setState({'running':false, 'current_time': 0, 'perc_progress': 0, 'ended': true});
		clearInterval(this.clockTimer);
		this.stopTimer = setTimeout( () => this.props.nextTimer(), 3000);
	}

	pause() {
		this.setState({'running':false});
		clearInterval(this.clockTimer);
		console.log('paused');
	}

	reset() {
		this.setState({'running':false, 'current_time': this.props.startFrom, 'perc_progress': 1});
		clearInterval(this.clockTimer);
		console.log('reset');
	}

	tick(endTime) {
		let now = new Date().getTime();
		let secs_elapsed = Math.round((endTime - now)/1000);
		let perc_progress = (endTime - now) / (this.props.startFrom * 1000);
		if (perc_progress > 0) {
			this.setState({'running': true, 'current_time': secs_elapsed, 'perc_progress': perc_progress})
		} else {
			this.stop();
		}
	}

	componentDidMount() {
		this.start();
	}

	componentWillUnmount() {
		clearInterval(this.clockTimer);
		clearTimeout(this.stopTimer);
	}

	render() {

		const playControl = this.state.running ? (
			<PauseButton pause={this.pause} />
		) : (
			<PlayButton start={this.start} />
		);

		const endBell = this.state.ended ? (
			<Audio audio='assets/end_bell_1.mp3' phrase={false} />
		) : (
			''
		)

		return (
			<div className="clock">
				<div className="donut">
						<svg viewBox="0 0 36 36">
						  <circle className="stroke" cx="18" cy="18" r="16" fill="transparent" stroke="#fff" strokeWidth="1" strokeDasharray={(this.state.perc_progress * 100) + " " + ((1-this.state.perc_progress) * 100)} strokeDashoffset="0" transform="rotate(-89 18 18)"></circle>
					</svg>
				</div>
				<h1 className="time">{this.state.current_time}</h1>
				<div className="clockbuttons">
					{playControl}
					<ResetButton reset={this.reset} />
				</div>
				{endBell}
			</div>
		);
	}
}
