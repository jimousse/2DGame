import { LitElement, html, css } from 'lit-element';
import { GameInterface } from '../game/game-interface.js';
import { KEYS } from './constants';
class CoolGame extends LitElement {
  constructor() {
    super();
    this._margin = 10;
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
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('game-speech', this._handleSpeechEvent);
    this._canvasSize = Math.min(
      document.documentElement.clientWidth - 2 * this._margin,
      document.documentElement.clientHeight - 2 * this._margin
    );
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
    const { show, content } = info.detail;
    this._showSpeechDialog = show;
    this._content = content;
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
    const controllerRadius = this._canvasSize/6; // just trying 🤷🏻‍♂️
    const contollerTop = this._canvasSize - 2 * controllerRadius;
    const speechMargin = 20;
    return html`
      <div>
        <canvas
          id="game-canvas"
          height="${this._canvasSize}px"
          width="${this._canvasSize}px"
          style="margin: ${this._margin}px">
        </canvas>
        <virtual-controller
          class="on-screen-controller"
          radius=${controllerRadius}
          style="top: ${contollerTop}px; left: ${contollerTop}px;"
          .clickHandlers=${this._controllerClickHandlers}>
        </virtual-controller>
        ${this._showSpeechDialog ?
          html`<text-dialog
            top=${this._canvasSize + this._margin - speechMargin}
            left=${this._margin + speechMargin}
            content=${this._content}
            name=${this._name}/>` : null}

      </div>
    `;
  }
}
customElements.define('cool-game', CoolGame);