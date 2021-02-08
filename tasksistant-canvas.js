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
    this.canvasEmptyMarginPixels = 50;
    this.canvasHeightPixels = 400;
    this.canvasWidthPixels = 400;
    this.setOfFigures = figures;
    this.stripes = {...this.directionSetPrototype};
    this.figureComplements = {
      up: '',
      down: '',
      left: '',
      right: ''
    };
    this.directionSetPrototype = {
      up: false,
      down: false,
      left: false,
      right: false
    };
  };

  /**
    * Object describing property-related metadata used by Polymer features
    */
  static get properties() {
    return {
      figure: {type: String},
      context: {type: Object},
      canvasEmptyMarginPixels: {type: Number},
      canvasHeightPixels: {type: Number},
      canvasWidthPixels: {type: Number},
      setOfFigures: {type: Array},
      stripes: {type: Object},
      figureComplements: {type: Object},
      directionSetPrototype: {type: Object}
    };
  };

  /**
   * @param {string} value
   */
  set figure(value) {
    let oldValue = this._figure;
    if(value !== undefined && value !== ''){
      this.drawFigure(value)
    };
    this._figure = value;
    this.requestUpdate('figure', oldValue);
  };

  get figure(){ return this._figure};

  /**
   * @param {string} value
   */
  set stripes(value) {
    let oldValue = this._stripe;
    if (Object.keys(value).length > 0) {
      this.drawStripes(value);
    };
    this._stripe = value;
    this.requestUpdate('stripe', oldValue);
  };

  get stripes(){ return this._stripes};

  set figureComplements(value) {
    let oldValue = this._figureComplements;
    if (this.figure !== '') {
      this.drawFigureComplements(value);
    };
    this._figureComplements = value;
    this.requestUpdate('figureComplements', oldValue);
  };

  get figureComplements(){ return this._figureComplements};

  static get styles() {
    return styles;
  }

  firstUpdated() {
    this.context = this.shadowRoot.getElementById('tasksistant-canvas').getContext('2d');
    this.showError = this.context ? false : true;
  }

  drawFigure(figure){
    this.clearCanvas();
    this.setOfFigures.get(figure)(this.context, this.canvasWidthPixels, this.canvasHeightPixels, this.canvasEmptyMarginPixels);
  }

  drawStripes(stripes) {
    this.clearCanvas();
    this.setOfFigures.get('stripe point')(this.context, this.canvasWidthPixels, this.canvasHeightPixels, this.canvasEmptyMarginPixels);
    for(const stripeKey in stripes){
      if(stripes[stripeKey]){
        this.setOfFigures.get(`${stripeKey} stripe`)(this.context, this.canvasWidthPixels, this.canvasHeightPixels, this.canvasEmptyMarginPixels);
      };
    };
  };

  drawFigureComplements(figureComplements) {
    this.drawFigure(this.figure);
    for(const figureComplementKey in figureComplements){
      if(figureComplementKey !== ''){
        if(figureComplementKey === 'up'){
          this.setOfFigures.get(`${figureComplementKey} ${figureComplements[figureComplementKey]}`)(this.context, this.canvasWidthPixels, this.canvasEmptyMarginPixels);
        };
        if(figureComplementKey === 'down'){
          this.setOfFigures.get(`${figureComplementKey} ${figureComplements[figureComplementKey]}`)(this.context, this.canvasWidthPixels, this.canvasHeightPixels, this.canvasEmptyMarginPixels);
        };
        if(figureComplementKey === 'left'){
          this.setOfFigures.get(`${figureComplementKey} ${figureComplements[figureComplementKey]}`)(this.context, this.canvasHeightPixels, this.canvasEmptyMarginPixels);
        };
        if(figureComplementKey === 'right'){
          this.setOfFigures.get(`${figureComplementKey} ${figureComplements[figureComplementKey]}`)(this.context, this.canvasWidthPixels, this.canvasHeightPixels, this.canvasEmptyMarginPixels);
        };
      };
    };
  };

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvasWidthPixels, this.canvasHeightPixels);
  };

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