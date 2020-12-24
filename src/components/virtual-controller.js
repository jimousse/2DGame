import { LitElement, svg, css  } from 'lit-element';

class VirtualController extends LitElement {

  constructor() {
    super();
    this._clickedOpacity = 1;
    this._defaultOpacity = 0.4;
    this._fill = '#f7ede2';
  }


  static get properties() {
    return {
      radius: { type: Number },
      clickHandlers: { type: Object }
    };
  }

  _mouseDownHandler(event, dir) {
    switch (dir) {
      case 'left':
        this.clickHandlers.left.mouseDown();
        break;
      case 'right':
        this.clickHandlers.right.mouseDown();
        break;
      case 'down':
        this.clickHandlers.down.mouseDown();
        break;
      case 'up':
        this.clickHandlers.up.mouseDown();
        break;

      default:
        break;
    }

    event.target.setAttribute('opacity', this._clickedOpacity);
  }

  _mouseUpHandler(event, dir) {
    switch (dir) {
      case 'left':
        this.clickHandlers.left.mouseUp();
        break;
      case 'right':
        this.clickHandlers.right.mouseUp();
        break;
      case 'down':
        this.clickHandlers.down.mouseUp();
        break;
      case 'up':
        this.clickHandlers.up.mouseUp();
        break;

      default:
        break;
    }

    event.target.setAttribute('opacity', this._defaultOpacity);
  }

  render() {
    const svgWidth = 2*this.radius;
    const svgHeight = 2*this.radius;
    const buttonSize = svgHeight/3;
    const buttons = [
      { dir: 'up', x: svgWidth/3, y: 0 },
      { dir: 'down', x: svgWidth/3, y: 2*svgHeight/3 },
      { dir: 'right', x: 2*svgWidth/3, y: svgHeight/3 },
      { dir: 'left', x: 0, y: svgHeight/3 }
    ];
    return svg`
      <svg
        viewBox="0 0 ${svgWidth} ${svgHeight}"
        width="${svgWidth}"
        height="${svgHeight}"
      >
        <defs>
          <clipPath id="circle-clip">
            <circle cx="${svgWidth/2}" cy="${svgHeight/2}" r="${this.radius}" />
          </clipPath>
      </defs>
      ${buttons.map(b =>
        svg`
          <rect
            class="button-direction"
            @mousedown=${(e) => { this._mouseDownHandler(e, b.dir); }}
            @mouseup=${(e) => { this._mouseUpHandler(e, b.dir); }}
            @touchstart=${(e) => { this._mouseDownHandler(e, b.dir); }}
            @touchend=${(e) => { this._mouseUpHandler(e, b.dir); }}
            clip-path="url(#circle-clip)"
            x="${b.x}"
            y="${b.y}"
            opacity="${this._defaultOpacity}"
            width="${buttonSize}"
            height="${buttonSize}"
            fill="${this._fill}"
          />
        `
      )}
    </svg>
    `;
  }
}

customElements.define('virtual-controller', VirtualController);