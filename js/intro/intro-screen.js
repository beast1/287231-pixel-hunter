import {showScreen} from "../utils";
import IntroView from "./intro-view";
import Application from "../application";

class IntroScreen {
  constructor() {
    this.view = new IntroView();
  }

  init() {
    this.view.onClick = () => {
      Application.showGreeting();
    };

    showScreen(this.view);
  }
}

export default new IntroScreen();
