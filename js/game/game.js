import LevelView from "./level-view";
import {changeView} from "../utils";
import greeting from "../greeting/greeting";
import stats from '../stats/stats';

const level = (state) => {
  const it = new LevelView(state);

  it.onBack = () => changeView(greeting());
  it.onAnswer = (isTrueAnswer) => {
    const nextState = Object.assign({}, state);
    if (isTrueAnswer) {
      nextState.history[nextState.level] = `correct`;
      nextState.points += 100;
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
