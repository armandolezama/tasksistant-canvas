import { LitElement, html } from 'lit-element';
import styles from './tasksistant-canvas-styles';

export class TasksistantCanvas extends LitElement {

  static get styles() {
    return styles;
  }

  render() {
    return html`
    <div id="main-container">
      <div id="canvas-container">
        <canvas></canvas>
      </div>
      <div id="error-message">
        <h2>Canvas tag not supported by your browser</h2>
      </div>
    </div>

    `;
  }
}
customElements.define('tasksistant-canvas', TasksistantCanvas);