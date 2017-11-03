import {showScreen} from "../utils";
import Application from "../application";
import RulesView from "./rules-view";
import {getGame, getInitialHistory, getInitialState} from "../data/game-data";

class RulesScreen {
  constructor() {
    this.view = new RulesView();
  }

  init() {
    this.view.onBack = () => {
      Application.showGreeting();
    };

    this.view.onStart = (name) => {
      const game = getGame(getInitialState(name), getInitialHistory());
      Application.startGame(game);
    };

    showScreen(this.view);
  }
}

export default new RulesScreen();
