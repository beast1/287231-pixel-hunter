import {showScreen} from "../utils";
import Application from "../application";
import RulesView from "./rules-view";

class RulesScreen {
  constructor() {
    this.view = new RulesView();
  }

  init() {
    this.view.onBack = () => {
      Application.showGreeting();
    };

    this.view.onStart = () => {
      Application.startGame();
    };

    showScreen(this.view);
  }
}

export default new RulesScreen();
