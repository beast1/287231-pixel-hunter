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
      const state = tick(game);

      if (!state) {
        const newGame = changeGameState(game, false);

        clearTimeout(timer);
        toggleScreens(newGame);
      } else {
        currentLevel.updateTime(state.state.time);
        startTimer();
      }
    }, 1000);
  };
  startTimer();

  currentLevel.onAnswer = (answer) => {
    clearTimeout(timer);

    const isCorrect = answer.every((it, i) => it === currentLevel.level.options[i].type);
    const newGame = changeGameState(game, isCorrect);

    toggleScreens(newGame);
  };

  currentLevel.onBack = () => {
    clearTimeout(timer);
    showScreen(greeting());
  };

  return currentLevel;
};

export default (game) => changeLevel(game);
