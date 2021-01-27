import { LitElement, html, css } from 'lit-element';
import { GameInterface } from '../game/game-interface.js';
import { KEYS } from './constants';


class CoolGame extends LitElement {
	constructor() {
		super();
		this._controllerClickHandlers = {
			right: {
				mouseDown: () => { this.gameInterface.playerGoRight(); },
				mouseUp: () => { this.gameInterface.playerStop(); }
			},
			left: {
				mouseDown: () => { this.gameInterface.playerGoLeft(); },
				mouseUp: () => { this.gameInterface.playerStop(); }
			},
			up: {
				mouseDown: () => { this.gameInterface.playerGoUp(); },
				mouseUp: () => { this.gameInterface.playerStop(); }
			},
			down: {
				mouseDown: () => { this.gameInterface.playerGoDown(); },
				mouseUp: () => { this.gameInterface.playerStop(); }
			}
		};
		this._showSpeechDialog = false;
	}

	static get styles() {
		return css`
			.on-screen-controller {
				position: fixed;
				bottom: 0px;
				right: 0px;
				user-select: none;
				height: min(min(50vw, 50vh), 400px);
				width: min(min(50vw, 50vh), 400px);
				margin: 5px;
			}
			#speech-bubble {
				position: fixed;
				bottom: 20px;
				left: 20px;
			}
			#container {
				height: 100%;
				width: 100%;
			}
			#game-canvas {
				height: 100%;
				width: 100%;
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
		window.addEventListener('resize', this._canvasResize.bind(this));
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
			const directionalKeys = [KEYS.ARROW_LEFT, KEYS.ARROW_RIGHT, KEYS.ARROW_UP, KEYS.ARROW_DOWN];
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

	_canvasResize() {
		this._canvas.width = this._canvas.offsetWidth;
		this._canvas.height = this._canvas.offsetHeight;
	}

	updated() {
		if (!this._canvas) {
			this._canvas = this.shadowRoot.getElementById('game-canvas');
			this._canvasResize();
		}
		if (!this.gameInterface) {
			this.gameInterface = new GameInterface(this._canvas);
			this.gameInterface.start();
		}
	}

	render() {
		return html`
			<div id="container">
				<canvas id="game-canvas"></canvas>
				<virtual-controller
					class="on-screen-controller"
					.clickHandlers=${this._controllerClickHandlers}>
				</virtual-controller>
				${this._showSpeechDialog ?
				html`<text-dialog
						id="speech-bubble"
						text=${this._text}
						name=${this._name} />` : null}
			</div>
		`;
	}
}
customElements.define('cool-game', CoolGame);