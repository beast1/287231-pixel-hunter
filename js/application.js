import introScreen from "./intro/intro-screen";
import greetingScreen from "./greeting/greeting-screen";
import rulesScreen from "./rules/rules-screen";
import gameScreen from "./game/game-screen";
import statsScreen from "./stats/stats-screen";
import {getGame, getInitialHistory, getInitialState} from "./data/game-data";

export default class Application {
  static showIntro() {
    introScreen.init();
  }

  static showGreeting() {
    greetingScreen.init();
  }

  static showRules() {
    rulesScreen.init();
  }

  static startGame(game = getGame(getInitialState(), getInitialHistory())) {
    gameScreen.init(game);
  }

  static showStats(game) {
    statsScreen.init(game);
  }
}
