import { LitElement, svg } from 'lit-element';

class VirtualController extends LitElement {

  static get properties() {
    return {
      radius: { type: Number }
    };
  }

  constructor() {
    super();
    this.radius = 50;
  }

  render() {
    const svgWidth = 2*this.radius;
    const svgHeight = 2*this.radius;
    const buttonSize = svgHeight/3;
    const buttons = [
      { id: 'up', x: svgWidth/3, y: 0, fill: '#696969', filterId: "shadow" },
      { id: 'down', x: svgWidth/3, y: 2*svgHeight/3, fill: '#696969', filterId: "shadow" },
      { id: 'right', x: 2*svgWidth/3, y: svgHeight/3, fill: '#696969', filterId: "shadow" },
      { id: 'left', x: 0, y: svgHeight/3, fill: '#696969', filterId: "shadow" },
      { id: 'center', x: svgWidth/3, y: svgWidth/3, fill: 'darkgrey' }
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
      <circle opacity="0.5" cx="${svgWidth/2}" cy="${svgHeight/2}" r="${this.radius}" />
      ${buttons.map(b =>
        svg`
          <rect
            @mousedown=${() => {
              let event = new CustomEvent('controller-mousedown', {
                detail: {
                  direction: b.id
                },
                bubbles: true
              });
              this.dispatchEvent(event);
            }}
            @mouseup=${() => {
              let event = new CustomEvent('controller-mouseup', {
                detail: {
                  direction: b.id
                },
                bubbles: true
              });
              this.dispatchEvent(event);
            }}
            @touchstart=${() => {
              let event = new CustomEvent('controller-touchstart', {
                detail: {
                  direction: b.id
                },
                bubbles: true
              });
              this.dispatchEvent(event);
            }}
            @touchend=${() => {
              let event = new CustomEvent('controller-touchend', {
                detail: {
                  direction: b.id
                },
                bubbles: true
              });
              this.dispatchEvent(event);
            }}
            clip-path="url(#circle-clip)"
            filter="url(#${b.filterId})"
            id="${b.id}"
            x="${b.x}"
            y="${b.y}"
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