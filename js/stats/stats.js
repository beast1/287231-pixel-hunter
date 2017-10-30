import {showScreen} from "../utils";
import {countScore} from "../data/game-data";
import greeting from "../greeting/greeting";
import StatsView from "./stats-view";

const getStats = (game) => {
  const score = countScore(game.history, game.state.lives);
  const stats = new StatsView(game, score);

  stats.onBack = () => {
    showScreen(greeting());
  };

  return stats;
};

export default (game) => getStats(game);
