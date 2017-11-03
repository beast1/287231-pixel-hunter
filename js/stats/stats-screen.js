import {showScreen} from "../utils";
import Application from "../application";
import StatsView from "./stats-view";
import Loader from "../loader";
import {adaptStats} from "../data/game-adapter";
import {countScore, Result} from "../data/game-data";

class StatsScreen {
  init(game) {
    const result = countScore(game.history, game.state.lives) < 0 ? Result.LOSE : Result.VICTORY;
    this.view = new StatsView();
    this.view.onBack = () => Application.showGreeting();

    Loader.loadResults(game.userName).
        then(adaptStats).
        then((results) => this.view.updateResults(results, result));

    showScreen(this.view);
  }
}

export default new StatsScreen();
