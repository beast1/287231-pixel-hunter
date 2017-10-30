import getStats from "../stats/stats";
import LevelView from "./level.view";
import {AnswerType, tick} from "../data/game-data";
import {showScreen} from "../utils";

const FAST_TIME = 20;
const SLOW_TIME = 10;
const INITIAL_TIME = 30;

const changeScreen = (game) => {
  if (game.state.level === 9 || game.state.lives < 0) {
    showScreen(getStats(game));
  } else {
    game.state.level += 1;
    game.state.time = INITIAL_TIME;
    showScreen(changeLevel(game));
  }
};

const changeLevel = (game) => {
  const level = new LevelView(game);
  let timer;

  const startTimer = () => {
    timer = setTimeout(() => {
      game = tick(game);

      if (game.state.time === 0) {
        level.game.history.push(AnswerType.WRONG);
        level.game.state.lives -= 1;
        changeScreen(game);
      }

      level.updateTime(game.state.time);
      startTimer();
    }, 1000);
  };
  startTimer();

  level.onAnswer = (answer) => {
    clearTimeout(timer);
    if (answer) {
      if (game.state.time < SLOW_TIME) {
        game.history.push(AnswerType.SLOW);
      } else if (game.state.time > FAST_TIME) {
        game.history.push(AnswerType.FAST);
      } else {
        game.history.push(AnswerType.CORRECT);
      }
    } else {
      game.history.push(AnswerType.WRONG);
      game.state.lives -= 1;
    }

    changeScreen(game);
  };

  return level;
};

export default (game) => changeLevel(game);
