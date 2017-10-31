import {showScreen} from "../utils";
import {countScore} from "../data/game-data";
import Application from "../application";
import StatsView from "./stats-view";

class StatsScreen {
  init(game) {
    const score = countScore(game.history, game.state.lives);

    this.view = new StatsView(game, score);

    this.view.onBack = () => {
      Application.showGreeting();
    };

    showScreen(this.view);
  }
}

export default new StatsScreen();
