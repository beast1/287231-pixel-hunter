import introScreen from "./intro/intro-screen";
import greetingScreen from "./greeting/greeting-screen";
import rulesScreen from "./rules/rules-screen";
import gameScreen from "./game/game-screen";
import statsScreen from "./stats/stats-screen";
import {getGame, getInitialHistory, getInitialState} from "./data/game-data";

const ControllerId = {
  INTRO: ``,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`
};

const Route = {
  [ControllerId.INTRO]: introScreen,
  [ControllerId.GREETING]: greetingScreen,
  [ControllerId.RULES]: rulesScreen,
  [ControllerId.GAME]: gameScreen,
  [ControllerId.STATS]: statsScreen
};

const saveState = (state) => {
  return JSON.stringify(state);
};

const loadState = (dataString) => {
  try {
    return JSON.parse(dataString);
  } catch (e) {
    return getGame(getInitialState(), getInitialHistory());
  }
};

export default class Application {
  static init() {
    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);

      this.changeHash(id, data);
    };

    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
    const controller = Route[id];

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
    location.hash = `${ControllerId.STATS}?${saveState(game)}`;
  }
}
