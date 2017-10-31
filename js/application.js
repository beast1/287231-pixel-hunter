import introScreen from "./intro/intro-screen";
import greetingScreen from "./greeting/greeting-screen";
import rulesScreen from "./rules/rules-screen";
import gameScreen from "./game/game-screen";
import statsScreen from "./stats/stats-screen";
import {getGame, getInitialHistory, getInitialState} from "./data/game-data";

const initialState = getInitialState();
const initialHistory = getInitialHistory();

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

  static startGame(game = getGame(initialState, initialHistory)) {
    gameScreen.init(game);
  }

  static showStats(game = getGame(initialState, initialHistory)) {
    statsScreen.init(game);
  }
}
