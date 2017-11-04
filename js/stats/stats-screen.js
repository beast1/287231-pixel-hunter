import {showScreen} from "../utils";
import Application from "../application";
import StatsView from "./stats-view";
import Loader from "../loader";
import {adaptStats} from "../data/game-adapter";
import {Result} from "../data/game-data";

class StatsScreen {
  init(data) {
    const result = data.isWin ? Result.VICTORY : Result.LOSE;
    this.view = new StatsView();

    Loader.loadResults(data.userName).
        then(adaptStats).
        then((stats) => this.view.updateResults(stats, result));

    this.view.onBack = () => Application.showGreeting();

    showScreen(this.view);
  }
}

export default new StatsScreen();
