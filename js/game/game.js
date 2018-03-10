import LevelView from "./level-view";
import {changeView} from "../utils";
import greeting from "../greeting/greeting";
import stats from '../stats/stats';
import {InitialState} from '../data/game-data';

const level = (state) => {
  const it = new LevelView(state);
  let timer;

  const timerTick = () => {
    timer = setTimeout(() => {
      state.time -= 1;
      if (state.time === -1) {
        it.onAnswer(false);
      }
      it.updTime(state.time);
      timerTick();
    }, 1000);
  };
  timerTick();

  it.onBack = () => changeView(greeting());
  it.onAnswer = (isTrueAnswer) => {
    clearTimeout(timer);
    const nextState = Object.assign({}, state);
    nextState.time = InitialState.TIME;
    if (isTrueAnswer) {
      if (state.time >= 20) {
        nextState.history[nextState.level] = `fast`;
        nextState.points += 150;
      } else if (state.time >= 10) {
        nextState.history[nextState.level] = `correct`;
        nextState.points += 100;
      } else if (state.time >= 0) {
        nextState.history[nextState.level] = `slow`;
        nextState.points += 50;
      }
    } else {
      nextState.history[nextState.level] = `wrong`;
      nextState.lives -= 1;
    }
    nextState.level += 1;
    if (state.level === 9 || nextState.lives === -1) {
      changeView(stats(nextState));
    } else {
      changeView(level(nextState));
    }
  };

  return it;
};

export default (state) => level(state);
