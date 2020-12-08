import { LitElement, html } from 'lit-element';
import { GameInterface } from '../game/game-interface.js';

const KEYS = {
  ARROW_RIGHT: 'ArrowRight',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  TAB: 'Tab',
  SPACE: ' ',
  ENTER: 'Enter',
  ESCAPE: 'Escape'
};

class CoolGame extends LitElement {
  constructor() {
    super();
    this.canvas = this.shadowRoot.getElementById('game-canvas');
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
  }

  connectedCallback() {
    super.connectedCallback();
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
      if (directionalKeys.indexOf(key) >= 0) this.gameInterface.playerStop();
    });
  }

  updated() {
    const canvas = this.shadowRoot.getElementById('game-canvas');
    this.gameInterface = new GameInterface(canvas);
    this.gameInterface.start();
  }

  render() {
    return html`
      <div id="game-container">
        <canvas id="game-canvas"></canvas>
        <virtual-controller radius="200" .clickHandlers=${this._controllerClickHandlers}>
        </virtual-controller>
      </div>
    `;
  }
}
customElements.define('cool-game', CoolGame);