import React from 'react';
import {PlayButtonImg, PauseButtonImg, ResetButtonImg, ExitButtonImg, PrevButtonImg, NextButtonImg} from './ButtonImages.jsx';

export class StartButton extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
			e.preventDefault();
			console.log('press');
			this.props.startTimer;
	}

	render() {
		return <button className="startbutton" onClick={this.props.startTimer}>Start</button>;
	}
}


export class ExitButton extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
			e.preventDefault();
			this.props.exitTimer;
	}

	render() {
		return <button className="exitbutton" onClick={this.props.exitTimer}><ExitButtonImg /></button>;
	}
}


export class NextTimerButton extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
			e.preventDefault();
			this.props.nextTimer;
	}

	render() {
		return <button className="nexttimerbutton" onClick={this.props.nextTimer}><NextButtonImg /></button>;
	}
}


export class PrevTimerButton extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
			e.preventDefault();
			this.props.prevTimer;
	}

	render() {
		return <button className="prevtimerbutton" onClick={this.props.prevTimer}><PrevButtonImg /></button>;
	}
}


export class PauseButton extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
			e.preventDefault();
			this.props.pause;
	}

	render() {
		return <button className="pausebutton" onClick={this.props.pause}><PauseButtonImg /></button>;
	}
}


export class PlayButton extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
			e.preventDefault();
			this.props.start;
	}

	render() {
		return <button className="playbutton" onClick={this.props.start}><PlayButtonImg /></button>;
	}
}


export class ResetButton extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
			e.preventDefault();
			this.props.reset;
	}

	render() {
		return <button className="resetbutton" onClick={this.props.reset}><ResetButtonImg /></button>;
	}
}
