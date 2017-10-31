import {getElementFromTemplate} from "./utils";

export default class AbstractView {
  get template() {
    throw new Error(`Template for the view is not defined`);
  }

  render() {
    return getElementFromTemplate(this.template);
  }

  bind() {

  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
}
