import { LitElement, svg } from 'lit-element';

class VirtualController extends LitElement {

  static get properties() {
    return {
      radius: { type: Number },
      clickHandlers: { type: Object }
    };
  }

  constructor() {
    super();
    this.radius = 50;
    this._clickedOpacity = 1;
    this._defaultOpacity = 0.7;
  }

  _mouseDownHandler(event, buttonId) {
    switch (buttonId) {
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

  _mouseUpHandler(event, buttonId) {
    switch (buttonId) {
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
      { id: 'up', x: svgWidth/3, y: 0, fill: '#696969', filterId: "shadow", opacity: this._defaultOpacity },
      { id: 'down', x: svgWidth/3, y: 2*svgHeight/3, fill: '#696969', filterId: "shadow", opacity: this._defaultOpacity },
      { id: 'right', x: 2*svgWidth/3, y: svgHeight/3, fill: '#696969', filterId: "shadow", opacity: this._defaultOpacity },
      { id: 'left', x: 0, y: svgHeight/3, fill: '#696969', filterId: "shadow", opacity: this._defaultOpacity },
      { id: 'center', x: svgWidth/3, y: svgWidth/3, fill: '#515151', opacity: 1 }
    ];
    return svg`
      <svg
        viewBox="0 0 ${svgWidth} ${svgHeight}"
        width="${svgWidth}"
        height="${svgHeight}"
      >
        <defs>
          <filter id="shadow">
            <feDropShadow
              dx="0.2"
              dy="0.2"
              stdDeviation="1"
            />
          </filter>
          <clipPath id="circle-clip">
            <circle
              cx="${svgWidth/2}"
              cy="${svgHeight/2}"
              r="${this.radius}"
            />
          </clipPath>
      </defs>
      <circle opacity="0.4" cx="${svgWidth/2}" cy="${svgHeight/2}" r="${this.radius}" />
      ${buttons.map(b =>
        svg`
          <rect
            @mousedown=${(e) => {this._mouseDownHandler(e, b.id);}}
            @mouseup=${(e) => {this._mouseUpHandler(e, b.id);}}
            @touchstart=${(e) => {this._mouseDownHandler(e, b.id);}}
            @touchend=${(e) => {this._mouseUpHandler(e, b.id);}}
            clip-path="url(#circle-clip)"
            filter="url(#${b.filterId})"
            id="${b.id}"
            x="${b.x}"
            y="${b.y}"
            opacity="${b.opacity}"
            width="${buttonSize}"
            height="${buttonSize}"
            fill="${b.fill}"
          />
        `
      )}
    </svg>
    `;
  }
}

customElements.define('virtual-controller', VirtualController);