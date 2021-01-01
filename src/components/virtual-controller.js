import { LitElement, svg  } from 'lit-element';
class VirtualController extends LitElement {

  constructor() {
    super();
    this._clickedOpacity = 1;
    this._defaultOpacity = 0.4;
    this._fill = '#f7ede2';
    this._resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => entry.target.resizedCallback());
    });
  }


  static get properties() {
    return {
      clickHandlers: { type: Object }
    };
  }


  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver.unobserve(this);
  }

  resizedCallback() {
    this.requestUpdate();
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
    const { width, height } = this.getBoundingClientRect();
    const radius = height/2;
    const buttonSize = height/3;
    const buttons = [
      { dir: 'up', x: width/3, y: 0 },
      { dir: 'down', x: width/3, y: 2*height/3 },
      { dir: 'right', x: 2*width/3, y: height/3 },
      { dir: 'left', x: 0, y: height/3 }
    ];
    return svg`
      <svg
        viewBox="0 0 ${width} ${height}"
        width="${width}"
        height="${height}"
      >
        <defs>
          <clipPath id="circle-clip">
            <circle cx="${width/2}" cy="${height/2}" r="${radius}" />
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