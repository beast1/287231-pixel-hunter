import getStats from "../stats/stats";
import LevelView from "./level-view";
import {tick, changeGameState, MAX_ANSWERS_LENGTH} from "../data/game-data";
import {showScreen} from "../utils";
import greeting from "../greeting/greeting";

const toggleScreens = (game) => {
  if (game.state.level === MAX_ANSWERS_LENGTH || game.state.lives < 0) {
    showScreen(getStats(game));
  } else {
    showScreen(changeLevel(game));
  }
};

const changeLevel = (game) => {
  const currentLevel = new LevelView(game);
  let timer;

  const startTimer = () => {
    timer = setTimeout(() => {
      game = tick(game);

      if (game.state.time === 0) {
        const _game = changeGameState(false);

        clearTimeout(timer);
        toggleScreens(_game);
      }

      currentLevel.updateTime(game.state.time);
      startTimer();
    }, 1000);
  };
  startTimer();

  currentLevel.onAnswer = (answer) => {

    clearTimeout(timer);

    const isCorrect = answer.every((it, i) => it === currentLevel.level.options[i].type);
    const _game = changeGameState(game, isCorrect);

    toggleScreens(_game);
  };

  currentLevel.onBack = () => {
    showScreen(greeting());
  };

  return currentLevel;
};

export default (game) => changeLevel(game);
