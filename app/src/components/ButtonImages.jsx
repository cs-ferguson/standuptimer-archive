import React from 'react';

export function PlayButtonImg() {
	return <svg viewBox="0 0 64 64"><polygon className="stroke" fill="none" stroke="#fff" strokeWidth="3" points="12,14 54,32 12,50"/></svg>;
}

export function PauseButtonImg() {
	return (
		<svg viewBox="0 0 64 64">
			<rect className="stroke" x="14" y="14" height="38" width="12" fill="none" stroke="#fff" strokeWidth="3"></rect>
			<rect className="stroke" x="36" y="14" height="38" width="12" fill="none" stroke="#fff" strokeWidth="3"></rect>
		</svg>
	)
}

export function ResetButtonImg() {
	return <svg viewBox="0 0 64 64"><path className="fill" fill="#fff" d="M37.707,9.586c-13.234,0-24,10.766-24,24v13.171l-8.586-8.585L2.293,41l13.414,13.414L29.121,41l-2.828-2.828l-8.586,8.585	V33.586c0-11.028,8.972-20,20-20s20,8.972,20,20c0,5.342-2.08,10.364-5.858,14.143l2.829,2.828	c4.533-4.534,7.029-10.561,7.029-16.971C61.707,20.352,50.941,9.586,37.707,9.586z"/></svg>;
}

export function ExitButtonImg() {
	return <svg viewBox="0 0 64 64"><path className="stroke" d="M50 14 L14 50 M14 14 L50 50" fill="none" stroke="#fff" strokeWidth="3" /></svg>;
}

export function PrevButtonImg() {
	return <svg viewBox="0 0 64 64"><path className="stroke" d="M42 14 L22 32 L42 50" fill="none" stroke="#fff" strokeWidth="3" /></svg>;
}

export function NextButtonImg() {
	return <svg viewBox="0 0 64 64"><path className="stroke" d="M22 14 L42 32 L22 50" fill="none" stroke="#fff" strokeWidth="3" /></svg>;
}

export function EditPencilImg() {
	return <svg viewBox="0 0 459 459"><path className="fill" d="M0,362.1V459h96.9l280.5-283.05l-96.9-96.9L0,362.1z M451.35,102c10.2-10.2,10.2-25.5,0-35.7L392.7,7.649	c-10.2-10.2-25.5-10.2-35.7,0l-45.9,45.9l96.9,96.9L451.35,102z"/></svg>;
}
