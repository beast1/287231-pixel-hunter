import {showScreen} from "../utils";
import Application from "../application";
import GreetingView from "./greeting-view";

class GreetingScreen {
  constructor() {
    this.view = new GreetingView();
  }

  init() {
    this.view.onClick = () => {
      Application.showRules();
    };

    showScreen(this.view);
  }
}

export default new GreetingScreen();
