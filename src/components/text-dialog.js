import { LitElement, html, css, unsafeCSS } from 'lit-element';


const PADDING = 20;
const FONT_SIZE = 35;
const FONT_FAMILY = 'Arial';
const MAX_HEIGHT = 300;
const MAX_WIDTH = 300;

class TextDialog extends LitElement {

  constructor() {
    super();
    this.content = 'Zzzzz...';
    this.name = 'Jimmy';
    this.left = 0;
    this.top = 0;
  }

  static get properties() {
    return {
      content: { type: String },
      name: { type: String },
      left: { type: Number },
      top: { type: Number }
    };
  }

  static get styles() {
    return css`
      .speech {
        padding: ${unsafeCSS(`${PADDING}px`)};
        font-size: ${unsafeCSS(`${FONT_SIZE}px`)};
        font-family: ${unsafeCSS(FONT_FAMILY)};
        font-weight: bold;
        border-radius: 30px;
        min-width: 40px;
        text-align: center;
        align-self: flex-end;
        position: relative;
        z-index: 2;
      }


      .speech:before {
        content: "";
        position: absolute;
        background: #f7ede2;
        height: 60%;
        width: 106%;
        left: -3%;
        border-radius: 50px;
        top: 10%;
        z-index: -1;
      }


      .speech:after {
        content: "";
        position: absolute;
        background: #f7ede2;
        width: 100%;
        height: 60%;
        left: 0;
        border-radius: 30px;
        top: 30%;
        z-index: -1;
      }

      .content {
        overflow-wrap: break-word;
        overflow: auto;
        color: #867760;
        max-width: ${unsafeCSS(`${MAX_WIDTH - 2*PADDING}px`)};
        max-height: ${unsafeCSS(`${MAX_HEIGHT - 2*PADDING}px`)};
      }

      .container {
        display: flex;
        height: ${unsafeCSS(`${MAX_HEIGHT}px`)};
        width: ${unsafeCSS(`${MAX_WIDTH}px`)};
      }

      .name {
        position: absolute;
        top: -15%;
        left: 7%;
        z-index: 1;
        color: #662616;
        font-size: ${unsafeCSS(`${FONT_SIZE/2}px`)};
        border-radius: 20px;
        background: #d68033;
        padding: 5px;
        transform: rotate(-5deg);
      }
    `;
  }

  render() {
    if (!this.content) return null;

    return html`
      <div class="container" style="position: absolute; top:${this.top - MAX_HEIGHT}px; left:${this.left}px;">
        <div class="speech">
          <div class="name"> Jimmy </div>
          <div class="content">${this.content}</div>
        </div>
      </div>
    `;
  }
}

customElements.define('text-dialog', TextDialog);