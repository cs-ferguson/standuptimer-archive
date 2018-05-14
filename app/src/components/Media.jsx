import React from 'react';

export class Audio extends React.Component {
	render() {
		const src = this.props.phrase ? (
			'http://localhost:8083/audio/'+this.props.audio
		) : (
			this.props.audio
		)

		return (
			<audio autoPlay='autoplay'>
				<source src={src} />
			</audio>
		);
	}
}

export class SpeechApiAudio extends React.Component {
	constructor(props) {
		super(props)

		if ('speechSynthesis' in window) {
			this.speech = this.createSpeech();
		} else {
			console.warn('The current browser does not support the speechSynthesis API.')
		}
	}

	createSpeech() {
		let languages = ['en-GB','en-US','en-AU','es-ES','cs-CZ','it-IT','pl-PL','ru-RU','fr-FR'];
		let speech = new SpeechSynthesisUtterance();
		speech.text = this.props.audio;
		speech.lang = languages[0];
		speech.pitch = 1;

		return speech;
	}

	speak() {
		window.speechSynthesis.speak(this.speech);
	}

	componentDidMount() {
		this.speak();
	}

	render() {
		return null;
	}
}

export class Video extends React.Component {
	render() {
		const src = this.props.src;

		return (
			<video autoPlay='autoplay'>
				<source src={src} />
			</video>
		);
	}
}

export class Image extends React.Component {
	render() {

		const src = this.props.src;

		return (
				<img className='timerBackground' src={src} />
		);
	}
}
