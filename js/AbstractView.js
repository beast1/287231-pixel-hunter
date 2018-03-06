import {getElement} from "./utils";

export default class AbstractView {
  get template() {
    console.error(`You have define template for view`);
  }
  render() {
    return getElement(this.template);
  }
  bind() {}
  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
}
