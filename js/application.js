import introScreen from "./intro/intro-screen";
import greetingScreen from "./greeting/greeting-screen";
import rulesScreen from "./rules/rules-screen";
import GameScreen from "./game/game-screen";
import statsScreen from "./stats/stats-screen";
import {getGame, getInitialHistory, getInitialState} from "./data/game-data";
import Loader from "./loader";

const ControllerId = {
  INTRO: ``,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`
};

const saveState = (state) => {
  return JSON.stringify(state);
};

const loadState = (dataString) => {
  try {
    return JSON.parse(dataString);
  } catch (e) {
    return e;
  }
};

export default class Application {
  static init(game) {
    this.Route = {
      [ControllerId.INTRO]: introScreen,
      [ControllerId.GREETING]: greetingScreen,
      [ControllerId.RULES]: rulesScreen,
      [ControllerId.GAME]: new GameScreen(game),
      [ControllerId.STATS]: statsScreen
    };

    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);

      this.changeHash(id, data);
    };

    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
    const controller = this.Route[id];

    if (controller) {
      if (!data) {
        controller.init();
      } else {
        controller.init(loadState(data));
      }
    }
  }

  static showIntro() {
    location.hash = ControllerId.INTRO;
  }

  static showGreeting() {
    location.hash = ControllerId.GREETING;
  }

  static showRules() {
    location.hash = ControllerId.RULES;
  }

  static startGame(game = getGame(getInitialState(), getInitialHistory())) {
    location.hash = `${ControllerId.GAME}?${saveState(game)}`;
  }

  static showStats(game) {
    const currentData = {
      userName: game.state.userName,
      isWin: game.state.lives > 0
    };

    Loader.saveResults(game).then(() => {
      location.hash = `${ControllerId.STATS}?${saveState(currentData)}`;
    });
  }
}

