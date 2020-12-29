import { LitElement, html, css } from 'lit-element';
import { GameInterface } from '../game/game-interface.js';
import { KEYS } from './constants';
class CoolGame extends LitElement {
	constructor() {
		super();
		this._margin = 0;
		this._controllerClickHandlers = {
			right: {
				mouseDown: () => { this.gameInterface.playerGoRight();},
				mouseUp: () => { this.gameInterface.playerStop();}
			},
			left: {
				mouseDown: () => { this.gameInterface.playerGoLeft();},
				mouseUp: () => { this.gameInterface.playerStop();}
			},
			up: {
				mouseDown: () => { this.gameInterface.playerGoUp();},
				mouseUp: () => { this.gameInterface.playerStop();}
			},
			down: {
				mouseDown: () => { this.gameInterface.playerGoDown();},
				mouseUp: () => { this.gameInterface.playerStop();}
			}
		};
		this._showSpeechDialog = false;
	}

	static get styles() {
		return css`
			.on-screen-controller {
				position: absolute;
				user-select: none;
			}
			#game-canvas {
				user-select: none;
				-webkit-touch-callout: none;
				-webkit-user-select: none;
				-khtml-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
			}
		`;
	}

	connectedCallback() {
		super.connectedCallback();
		this.addEventListener('game-speech', this._handleSpeechEvent);
		this._canvasWidth = document.documentElement.clientWidth - 2 * this._margin;
		this._canvasHeight = document.documentElement.clientHeight - 2 * this._margin;
		window.addEventListener('keydown', ({ key }) => {
			switch (key) {
				case KEYS.ARROW_LEFT:
				this.gameInterface.playerGoLeft();
					break;
				case KEYS.ARROW_UP:
				this.gameInterface.playerGoUp();
					break;
				case KEYS.ARROW_RIGHT:
				this.gameInterface.playerGoRight();
					break;
				case KEYS.ARROW_DOWN:
				this.gameInterface.playerGoDown();
					break;
			}
		});
		window.addEventListener('keyup', ({ key }) => {
			const directionalKeys = [ KEYS.ARROW_LEFT, KEYS.ARROW_RIGHT, KEYS.ARROW_UP, KEYS.ARROW_DOWN ];
			if (directionalKeys.indexOf(key) >= 0) {
				this.gameInterface.playerStop();
			}
		});
	}

	_handleSpeechEvent(info) {
		const { show, text, name } = info.detail;
		this._showSpeechDialog = show;
		this._text = text;
		this._name = name;
		this.requestUpdate();
	}

	updated() {
		if (!this.gameInterface) {
			const canvas = this.shadowRoot.getElementById('game-canvas');
			this.gameInterface = new GameInterface(canvas);
			this.gameInterface.start();
		}
	}

	render() {
		const controllerRadius = Math.min(this._canvasHeight, this._canvasWidth)/6; // 🤷🏻‍♂️
		const contollerTop = this._canvasHeight - 2 * controllerRadius;
		const contollerLeft = this._canvasWidth - 2 * controllerRadius;
		const speechMargin = 20; // 🤷🏻‍♂️
		return html`
			<div>
				<canvas
					id="game-canvas"
					height="${this._canvasHeight}px"
					width="${this._canvasWidth}px"
					style="margin: ${this._margin}px">
				</canvas>
				<virtual-controller
					class="on-screen-controller"
					radius=${controllerRadius}
					style="top: ${contollerTop}px; left: ${contollerLeft}px;"
					.clickHandlers=${this._controllerClickHandlers}>
				</virtual-controller>
				${this._showSpeechDialog ?
					html`<text-dialog
						top=${this._canvasHeight + this._margin - speechMargin}
						left=${this._margin + speechMargin}
						text=${this._text}
						name=${this._name} />` : null}

			</div>
		`;
	}
}
customElements.define('cool-game', CoolGame);