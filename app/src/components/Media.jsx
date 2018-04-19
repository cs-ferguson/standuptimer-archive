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
