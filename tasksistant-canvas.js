import { LitElement, html } from 'lit-element';
import styles from './tasksistant-canvas-styles';
import figures from './tasksistant-chart-figures';

export class TasksistantCanvas extends LitElement {

  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this.figure = '';
    this.context = {};
    this.canvasHeightPixels = 400;
    this.canvasWidthPixels = 400;
    this.setOfFigures = figures;
  }

  /**
    * Object describing property-related metadata used by Polymer features
    */
  static get properties() {
    return {
      figure: {type: String},
      context: {type: Object},
      canvasHeightPixels: {type: Number},
      canvasWidthPixels: {type: Number},
      setOfFigures: {type: Array}
    };
  }

  /**
   * @param {string} value
   */
  set figure(value) {
    let oldValue = this._figure;
    if(value !== undefined && value !== ''){
      this.draw(value)
    }
    this._figure = value;
    this.requestUpdate('myProp', oldValue);
  } 

  static get styles() {
    return styles;
  }

  firstUpdated() {
    this.context = this.shadowRoot.getElementById('tasksistant-canvas').getContext('2d');
    this.showError = this.context ? false : true;
  }

  draw(figure){
    this.clearCanvas();
    this.setOfFigures.get(figure)(this.context, this.canvasWidthPixels, this.canvasHeightPixels);
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvasWidthPixels, this.canvasHeightPixels);
  }
  render() {
    return html`
    <div id="main-container">
      <div id="canvas-container">
        <canvas width="${this.canvasWidthPixels}" height="${this.canvasHeightPixels}" id="tasksistant-canvas"></canvas>
      </div>
      ${(() => {
          if(this.showError){
            return html`
              <div id="error-message">
                <h2>Canvas tag not supported by your browser</h2>
              </div>
            `;
          }
        })()}
    </div>

    `;
  }
}
customElements.define('tasksistant-canvas', TasksistantCanvas);